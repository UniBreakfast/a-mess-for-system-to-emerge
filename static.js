module.exports = { handleStatic }

const { join } = require('path')
const { createReadStream } = require('fs')
const { PassThrough } = require('stream')
const { mimeTypes } = require('./types.js')

function handleStatic(url) {
  if (url === '/') url = '/index.html'

  const filePath = join(__dirname, 'public', url)
  const stream = createReadStream(filePath)

  return new Promise((resolve, reject) => {

    stream.on('error', () => {
      const headers = { 'Content-Type': 'text/plain' }
      const stream = new PassThrough()

      stream.end('404, File not found ' + url)

      resolve({ stream, statusCode: 404, headers })
    })

    stream.on('open', () => {
      const extension = url.split('.').pop()
      const headers = { 'Content-Type': mimeTypes[extension] || 'text/plain' }

      resolve({ stream, statusCode: 200, headers })
    })
  })
}
