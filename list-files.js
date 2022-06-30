module.exports = { buildFileList }

const { readdir, stat } = require('fs/promises')

async function buildFileList(path = '.') {
  const entities = await readdir(path)
  const list = await Promise.all(
    entities.map(async name => {
      const stats = await stat(path + '/' + name)
      return { name, isFolder: stats.isDirectory() }
    })
  )
  
  return list.sort(compareEntities)
}

function compareEntities(a, b) {
  if (a.isFolder && !b.isFolder) return -1
  if (!a.isFolder && b.isFolder) return 1
  return a.name.localeCompare(b.name)
}
