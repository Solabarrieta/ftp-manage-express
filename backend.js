const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ftpMethods = require('./ftp-methods/ftpMethods')


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
  console.log('Ok3')
  let {filePathOrigin, filePathDest} = req.query
  ftpMethods.getFile(filePathOrigin,filePathDest).then((data) =>{
    console.log(data)
    if(data.status === "Ok"){
      res.send(data)
    }
  } ).catch((err) => {
    console.error(err)
  })
});


