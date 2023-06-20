const Cliente = require('ftp');

const cliente = new Cliente();

let credenciales = {
  host: '127.0.0.1',
  port: 21,
  user:'one',
  password: '1234'
}

cliente.connect(credenciales);

cliente.on('ready', () => {
  console.log("Connected to FTP server!");
  cliente.list((err, data) => {
    if(err){
      console.error('Error listing: ', err);
    }else {
      console.log(data);
      cliente.end();
    }
  })
})
