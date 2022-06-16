export { getFileList }

import { apiCall } from './api-call.js'

async function getFileList(path='.') {
  return apiCall('filelist', {path}, 'POST')
}
