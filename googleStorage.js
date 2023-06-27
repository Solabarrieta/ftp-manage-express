const {Storage} = require('@google-cloud/storage')
const path = require('path')
// const stream = require('stream')

const googleStorage = new Storage({
  keyFilename: path.join(__dirname, './tfg-oier-driver-generico-1498d8e348b4.json'),
  projectId: 'tfg-oier-driver-generico'
})
// googleStorage.getBuckets().then(buckets => console.log(buckets))



function getBucket() {
  const bucket = googleStorage.bucket('tfg-oier-driver-generic')
  return bucket
}

async function streamUpload(stream, filePath) {
  const bucket = getBucket()
  let destPath = path.join('Users', 'one', filePath)
  console.log(destPath)
  const file = bucket.file(destPath)
  stream.pipe(file.createWriteStream()).on('finish', () => {console.log('Uploaded')})
}


module.exports = {
  getBucket: getBucket,
  streamUpload: streamUpload
}


