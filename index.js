import api from './api.js'

const connectBtn = document.getElementById("connect-btn")
connectBtn.addEventListener("click", apiSetConnection)
const inputBtn = document.getElementById("input-file")
console.log(inputBtn)
inputBtn.addEventListener('change', (event) =>{
  event.preventDefault()
  const file = event.target.files[0]
  apiPutFile(file)
})
const downloadBtn = document.getElementById('download-btn')
downloadBtn.addEventListener('click', apiGetFile)



async function apiPutFile(file){
  console.log(file)
  let response = await api.putFile(file)
  console.log(response)
}



async function apiSetConnection() {
  let response = await api.setConnection();
  console.log(response);
}

async function apiGetFile() {
  console.log('Ok1')
  let response = await api.getFile('/prueba2.js', './uploads');
  return response;
}




