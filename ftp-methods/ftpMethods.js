const Cliente = require('ftp')
const client = new Cliente()
const utils = require('../utils.js')

//Messages for user
const serverMsgs = require('../serverMessages.js')
const credenciales = {
  host: '127.0.0.1',
  port: 21,
  user: 'one',
  password: '1234'
}


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
      let file = {
        destPath: '',
        fileName: ''
      }
      file.destPath = utils.getDestPath(filePathOrigin, filePathDest)
      file.fileName = utils.getFileName(filePathOrigin)
      client.get('prueba2.js', function(err, stream) {
        if (err) {
          console.error(err)
          reject(err)
        }else{
          // stream.once('close', function() { client.end(); });
          // stream.pipe(fs.createWriteStream(destPath));
          resolve({status: 'Ok', file: file, stream: stream})
        }
      });
    });
  });
}

module.exports = {
  getFile: getFile,
  setConnection: setConnection
}
