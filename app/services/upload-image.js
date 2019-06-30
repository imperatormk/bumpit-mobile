const bgHttp = require('nativescript-background-http')
const session = bgHttp.session('image-upload')

const fs = require('tns-core-modules/file-system')
const imageSourceModule = require('tns-core-modules/image-source')

const startUpload = (image, endpoint, auth) => {
  const headers = {
    'Content-Type': 'application/octet-stream',
    'File-Name': image.path
  }
  if (auth) headers['Authorization'] = auth

  const request = {
    url: endpoint,
    method: 'POST',
    headers
  }

  const params = [{
    name: image.fieldName,
    filename: image.path,
    mimeType: 'image/jpeg'
  }]

  const constructResponse = (e) => {
    const event = {
      eventTitle: e.eventName,
      eventData: {
        error: e.error ? e.error.toString() : e.error,
        currentBytes: e.currentBytes,
        totalBytes: e.totalBytes,
        body: e.data,
        responseCode: e.responseCode
      }
    }
    return event
  }

  const task = session.multipartUpload(params, request)

  return new Promise((resolve, reject) => {
    task.on('complete', (e) => {
      resolve({ status: 'success' })
    })
    task.on('error', (e) => {
      const errObj = constructResponse(e)
      reject({
        status: 'error',
        statusCode: errObj.eventData.responseCode,
        msg: errObj.eventData.error
      })
    })
  })
}

const saveTempImage = (avatar, filename = 'image', ext = 'jpg') => {
  return imageSourceModule.fromAsset(avatar).then((imageSource) => {
    let folder = fs.knownFolders.documents()
    let path = fs.path.join(folder.path, `${filename}_${Date.now()}.${ext}`)
    imageSource.saveToFile(path, ext)

    return path
  })
}

const verifyFileSize = (path, maxSize) => {
  return new Promise((resolve, reject) => {
    const size = fs.File.fromPath(path).size
    if (size < maxSize) {
      resolve()
    } else {
      reject({ msg: 'fileExceedsMaxSize', details: { bytes: size - maxSize + 1 } })
    }
  })
}

export default {
  startUpload,
  saveTempImage,
  verifyFileSize
}