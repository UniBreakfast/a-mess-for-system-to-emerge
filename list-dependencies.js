module.exports = { buildDependencyList }

const { readFile } = require('fs/promises')
const { builtinModules } = require('module')


buildDependencyList.cache = {}
buildDependencyList.this = Symbol('this')

async function buildDependencyList(path='index.js') {
  if (buildDependencyList.cache[path]) {
    return buildDependencyList.cache[path]
  }

  let js = await readFile(path, 'utf8')

  const dependencyList = js.match(/(?<=require\(['"])[^'"]+(?=['"]\))/g)

  const dependencyNodes = Object.fromEntries(
    dependencyList.flatMap(dep => [dep, buildDependencyList(dep)])
  )

  return buildDependencyList.cache[path] = dependencyNodes
}
