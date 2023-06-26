const path = require('path')

function getFileName(fileOrigin) {
  const file = path.basename(fileOrigin)
  return file
}

function getDestPath(fileOrigin, fileDest){
  const file = path.basename(fileOrigin)
  let destPath = fileDest + "/" + file
  return destPath
}

module.exports = {
  getDestPath: getDestPath,
  getFileName: getFileName
}
