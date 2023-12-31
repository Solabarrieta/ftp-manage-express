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

function getFile(filePathOrigin){
  return new Promise((resolve, reject) => {
    client.connect(credenciales)
    client.on('ready', function() {
      console.log(serverMsgs.connected)
      // file.destPath = utils.getDestPath(filePathOrigin, filePathDest)
      client.get(filePathOrigin, function(err, stream) {
        if (err) {
          console.error(err)
          reject(err)
        }else{
          resolve({fileRequest_status: 'Ok', stream: stream})
        }
      });
    });
  });
}

module.exports = {
  getFile: getFile,
  setConnection: setConnection
}
