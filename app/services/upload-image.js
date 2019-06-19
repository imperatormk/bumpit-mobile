const bgHttp = require('nativescript-background-http')
const session = bgHttp.session('image-upload')

const startUpload = (image, endpoint, evCallback) => {
  const request = {
    url: endpoint,
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'File-Name': image
    }
  }

  const params = [
    { name: 'productImage', filename: image, mimeType: 'image/jpeg' }
  ]
  const task = session.multipartUpload(params, request)

  const onEvent = (e) => {
    const event = {
      eventTitle: e.eventName,
      eventData: JSON.stringify({
        error: e.error ? e.error.toString() : e.error,
        currentBytes: e.currentBytes,
        totalBytes: e.totalBytes,
        body: e.data,
        responseCode: e.responseCode
      })
    }
    if (evCallback) evCallback(event)
  }

  task.on('progress', onEvent.bind(this))
  task.on('error', onEvent.bind(this))
  task.on('responded', onEvent.bind(this))
  task.on('complete', onEvent.bind(this))
}

export default {
  startUpload
}