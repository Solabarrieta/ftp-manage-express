const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ftpMethods = require('./ftp-methods/ftpMethods');
const googleStorage = require('./googleStorage');
const utils = require('./utils.js')



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
  ftpMethods.setConnection()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get('/get-file', urlencodedParser,(req, res) => {
  let {filePathOrigin} = req.query
  ftpMethods.getFile(filePathOrigin).then((data) =>{
    console.log('Respuesta: ', data)
    let {fileRequest_status, stream} = data
    if(fileRequest_status === "Ok"){
      console.log('status Ok')
      let fileName = utils.getFileName(filePathOrigin)
      googleStorage.streamUpload(stream, fileName)
      .then(() => {
        res.send({upload_status: 'Ok'})
      })
      .catch(console.error)
    }
  } ).catch((err) => {
    console.error(err)
  })
});


