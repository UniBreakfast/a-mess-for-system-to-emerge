module.exports = { handleAPI }

const { endpointHandlers } = require('./endpoints.js')

async function handleAPI(endpoint, request) {
  const handleEndpoint = endpointHandlers[endpoint]

  if (!handleEndpoint) {
    return {
      body: { error: 'There is no endpoint like ' + endpoint },
      statusCode: 404
    }
  }

  return await handleEndpoint(request)
}
