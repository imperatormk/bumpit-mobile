const bgHttp = require('nativescript-background-http')
const session = bgHttp.session('image-upload')

const startUpload = (image, endpoint) => {
  const request = {
    url: endpoint,
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'File-Name': image.path
    }
  }

  const params = [
    { name: image.fieldName, filename: image.path, mimeType: 'image/jpeg' }
  ]

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
      reject({ status: 'error', msg: errObj.eventData.error })
    })
  })
}

export default {
  startUpload
}