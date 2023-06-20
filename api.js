
const api = axios.create({
  baseURL: 'http://localhost:8000', // Reemplaza el puerto con el que estés utilizando
});

async function setConnection(){
  const response = await api.get("/connect-ftp");
  return response;
}

async function putFile(file){
  console.log('Esto es una prueba: ',file)

  const response = await api.post('/put-ftp', file);
  return response
}

async function getFile(filePathOrigin, filePathDest) {
  console.log('Ok2')
  const options = {
    headers: {
        'content-type': 'application/json',
    },
    params: {
      filePathOrigin: filePathOrigin,
      filePathDest: filePathDest
    }
  };

  const response = await api.get('/get-file', options);
  console.log(response)
  return response;
}

export default{
  setConnection,
  putFile,
  getFile
}
