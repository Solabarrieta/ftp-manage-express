const Cliente = require('ftp')
const client = new Cliente()
const fs = require('fs')
const path = require('path')

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
      const file = path.basename(filePathOrigin)
      let destPath = filePathDest + "/" + file
      client.get('prueba2.js', function(err, stream) {
        if (err) {
          console.error(err)
          reject(err)
        }else{
          stream.once('close', function() { client.end(); });
          stream.pipe(fs.createWriteStream(destPath));
          resolve({status: 'Ok'})
        }
      });
    });
  });
}

module.exports = {
  getFile: getFile,
  setConnection: setConnection
}
