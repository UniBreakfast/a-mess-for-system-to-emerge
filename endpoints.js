const endpointHandlers = {}

module.exports = { endpointHandlers }

const { buildFileList } = require('./list-files.js')
const { getBody } = require('./get-body.js')

Object.assign(endpointHandlers, {
  'GET/greeting': async () => {
    return {
      body: { greeting: 'Hello, world!' },
      statusCode: 200
    }
  },

  'GET/filelist': async () => {
    const fileList = await buildFileList()

    return {body: fileList}
  },

  'POST/filelist': async (request) => {
    const {path} = await getBody(request)
    const fileList = await buildFileList(path)

    return {body: fileList}
  },
})
