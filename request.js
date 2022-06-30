module.exports = { handleRequest }

const { handleAPI } = require('./api.js')
const { handleStatic } = require('./static.js')

async function handleRequest(request, response) {
  const { method, url } = request
  
  if (url.startsWith('/api/')) {
    const { body, statusCode='200' } =
      await handleAPI(method + url.slice(4), request)
    
    response.writeHead(
      statusCode,
      { 'Content-Type': 'application/json; charset=utf-8' }
    )
    response.end(JSON.stringify(body))
  
  } else {
    const { stream, statusCode, headers } = await handleStatic(url)
    
    response.writeHead(statusCode, headers)
    stream.pipe(response)
  }
}
