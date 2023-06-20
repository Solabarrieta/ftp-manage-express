const serverMsgs = require('./serverMessages.js')
const express = require('express');
const Client = require('ftp');
const fs = require('fs')
const bodyParser = require('body-parser');
const cors = require('cors');
const client = new Client();
const credenciales = {
  host: '127.0.0.1',
  port: 21,
  user: 'one',
  password: '1234'
}

const app = express();

app.listen(8000, () => {
  console.log('Server is running on port 8000.');
});


app.use(cors());
app.use(express.json());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
let urlencodedParser = bodyParser.urlencoded({ extended: true })

app.get('/connect-ftp', (req, res) => {
  setConnection(credenciales)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get('/get-file', urlencodedParser,(req, res) => {
  console.log('Ok3')
  let {filePathOrigin, filePathDest} = req.query
  console.log(filePathOrigin)
  console.log(filePathDest)
  //res.send({status: 'Ok', data: filePathOrigin})
  getFile(filePathOrigin,filePathDest).then((status) =>{
    console.log(status)
    res.send(status)
  } ).catch((err) => {
    console.error(err)
  })
});






//Ftp functions

function setConnection() {
  return new Promise((resolve, reject) => {
    client.connect(credenciales);

    client.on('ready', () => {
      console.log(serverMsgs.connected);
      client.list((err, data) => {
        if (err) {
          console.error('Error listing: ', err);
          reject(err);
        } else {
          console.log(data);
          resolve(data);
          client.end();
        }
      });
    });
  });
}

function getFile(filePathOrigin, filePathDest){
  return new Promise((resolve, reject) => {
    client.connect(credenciales)
    client.on('ready', function() {
      console.log(serverMsgs.connected)
      client.get('prueba2.js', function(err, stream) {
        if (err) {
          console.error(err)
          reject(err)
        }else{
          stream.once('close', function() { client.end(); });
          stream.pipe(fs.createWriteStream(filePathDest));
          resolve({status: 'Ok'})
        }
      });
    });
  });
}

