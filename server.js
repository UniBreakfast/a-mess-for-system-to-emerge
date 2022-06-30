module.exports = { makeServer }

const { createServer } = require('http')
const { port } = require('./config.js')
const { handleRequest } = require('./request.js')

async function makeServer() {
  return {
    _server: createServer(handleRequest),
    
    async run() {
      return new Promise((resolve, reject) => {
        this._server.listen(port, err => {
          if (err) return reject(err)
          
          console.log("Server is running at http://localhost:" + port)
          resolve()
        })
      })
    }
  }
}
