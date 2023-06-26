const {Storage} = require('@google-cloud/storage')
const path = require('path')
// const stream = require('stream')

const googleStorage = new Storage({
  keyFilename: path.join(__dirname, './tfg-oier-driver-generico-1498d8e348b4.json'),
  projectId: 'tfg-oier-driver-generico'
})
// googleStorage.getBuckets().then(buckets => console.log(buckets))

// let contents = 'this is the file content'

// const bucket = getBucket();
// const file = bucket.file('prueba.txt')
// const passThroughStream = new stream.PassThrough()
// passThroughStream.write(contents)
// passThroughStream.end()


function getBucket() {
  const bucket = googleStorage.bucket('tfg-oier-driver-generic')
  return bucket
}

async function streamUpload(stream, filePath) {
  const bucket = getBucket()
  const file = bucket.file(filePath)
  return new Promise((resolve,reject) => {

    stream.pipe(file.createWriteStream()).on('finish', (err, data) => {
      if (err) {
        reject(err)
      }else{
        resolve(data)
      }
    })
  })
}

// streamUpload(passThroughStream, 'prueba2.txt')
// .then(() => console.log('Ok'))
// .catch(() => console.log('error'))


module.exports = {
  getBucket: getBucket,
  streamUpload: streamUpload
}


