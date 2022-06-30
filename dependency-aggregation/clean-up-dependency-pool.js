module.exports = { cleanUpDependencyPool }

const {findCommonPrefix} = require('./find-common-prefix.js')

const startsWithLetterRE = /^[a-z]/

function cleanUpDependencyPool(pool) {
  const { entryPoint, dependencies } = pool
  const paths = Object.keys(dependencies)
    .filter(path => !startsWithLetterRE.test(path))

  const prefix = findCommonPrefix(paths, '/')
  const { length } = prefix

  pool.entryPoint = entryPoint.replace(new RegExp('^' + prefix), '.')

  const entries = Object.entries(dependencies)

  entries.forEach(([path, deps]) => {
    if (!startsWithLetterRE.test(path)) {
      delete dependencies[path]
      dependencies['.' + path.slice(length)] = deps.map(
        dep => !startsWithLetterRE.test(dep) ? '.' + dep.slice(length) : dep
      )
    }
  })

  return pool
}
