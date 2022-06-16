module.exports = { getBody }

async function getBody(stream) {
  const chunks = []

  for await (const chunk of stream) chunks.push(chunk)

  return JSON.parse(Buffer.concat(chunks))
}
