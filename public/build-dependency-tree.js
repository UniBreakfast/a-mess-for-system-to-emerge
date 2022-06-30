export { buildDependencyTree }

function buildDependencyTree(pool, { bidirectional = false } = {}) {
  const entries = Object.entries(pool.dependencies)

  const makeBaseObj = bidirectional
    ? () => ({ requires: {__proto__: null}, requiredBy: {__proto__: null}, __proto__: null })
    : () => ({__proto__: null})

  const registry = Object.fromEntries(
    [...new Set(entries.map(([key]) => key))].map(key => [key, makeBaseObj()])
  )

  for (const [key, dependencies] of entries) {
    for (const dep of dependencies) {
      if (bidirectional) {
        registry[key].requires[dep] = registry[dep]
        registry[dep].requiredBy[key] = registry[key]
      } else {
        registry[key][dep] = registry[dep]
      }
    }
  }

  const tree = {[pool.entryPoint]: registry[pool.entryPoint], __proto__: null}

  return {tree, registry}
}
