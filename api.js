
const api = axios.create({
  baseURL: 'http://localhost:8000', // Reemplaza el puerto con el que estés utilizando
});

async function setConnection(){
  const response = await api.get("/connect-ftp");
  return response;
}
async function getFile(filePathOrigin) {
  console.log('Ok2')
  const options = {
    headers: {
        'content-type': 'application/json',
    },
    params: {
      filePathOrigin: filePathOrigin
    }
  };

  const response = await api.get('/get-file', options);
  console.log(response)
  return response;
}

export default{
  setConnection,
  getFile
}
