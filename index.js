import api from './api.js'

const connectBtn = document.getElementById("connect-btn")
connectBtn.addEventListener("click", apiSetConnection)

const fileOriginInput = document.getElementById('file-origin-input')
const fileDestInput = document.getElementById('file-dest-input')
let fileOriginPath = ''
let fileDestPath = ''

fileOriginInput.addEventListener('change', (event) => {
  fileOriginPath = event.target.value
  console.log('File origin: ', fileOriginPath)
})

fileDestInput.addEventListener('change', (event) => {
  fileDestPath = event.target.value
  console.log('File dest: ', fileDestPath)

})


const getRoutesBtn = document.getElementById('get-routes-btn')

getRoutesBtn.addEventListener('click', () => {
  apiGetFile(fileOriginPath, fileDestPath)
})


async function apiSetConnection() {
  let response = await api.setConnection();
  console.log(response);
}

async function apiGetFile(filePath) {
  console.log('Ok1')
  let response = await api.getFile(filePath, '/Users/oier/Documents/uni/TFG');
  return response;
}




