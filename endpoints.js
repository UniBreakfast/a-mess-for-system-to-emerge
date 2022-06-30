const endpointHandlers = {}

module.exports = { endpointHandlers }

const { resolve } = require('path/posix')

const { buildFileList } = require('./list-files.js')
const { getBody } = require('./get-body.js')
const { getDependencyPool } = require('./dependency-aggregation/get-dependency-pool.js')
const { sortDependencyPool } = require('./dependency-aggregation/sort-dependency-pool.js')
const { cleanUpDependencyPool } = require('./dependency-aggregation/clean-up-dependency-pool.js')


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
  
  'GET/dependencies': async () => {
    const dependencyPool = await getDependencyPool(resolve('./index.js'), { recurse: true })

    sortDependencyPool(dependencyPool)
    cleanUpDependencyPool(dependencyPool)
    
    return {body: dependencyPool}
  }
})
