const { makeServer } = require('./server.js')

makeServer().then(server => server.run())
