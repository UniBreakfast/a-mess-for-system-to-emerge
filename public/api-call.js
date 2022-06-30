export { apiCall }

async function apiCall(endpoint, body, method='GET') {
  const headers = { 'Content-Type': 'application/json; charset=utf-8' }
  const init = {method, headers}
  
  if (body) init.body = JSON.stringify(body)
  
  const response = await fetch('/api/' + endpoint, init)
  
  return await response.json()
}
