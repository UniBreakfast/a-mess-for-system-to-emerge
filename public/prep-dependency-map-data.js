export { prepDependencyMapData }

const defaults = { above: 2, below: 2 }

function prepDependencyMapData(registry) {
  return function prepMapData(filePath, { above = 2, below = 2 } = defaults) {
    const zeroNode = registry[filePath]

    if (!zeroNode) return []

    const data = [filePath]
    
    let dependencyModules = [zeroNode]

    for (let i = 1; i <= above; i++) {
      if (!dependencyModules.length) break

      const nodes = Object.fromEntries(dependencyModules.flatMap(
        module => Object.entries(module.requiredBy).map(
          ([label, dependency]) => [label, Object.keys(dependency.requiredBy)]
        )
      ))

      dependencyModules = dependencyModules.flatMap(
        module => Object.values(module.requiredBy)
      )

      data.unshift({relation: 'above', level: i, nodes})
    }

    dependencyModules = [zeroNode]

    for (let i = 1; i <= below; i++) {
      if (!dependencyModules.length) break

      const nodes = Object.fromEntries(dependencyModules.flatMap(
        module => Object.entries(module.requires).map(
          ([label, dependency]) => [label, Object.keys(dependency.requires)]
        )
      ))

      dependencyModules = dependencyModules.flatMap(
        module => Object.values(module.requires)
      )

      data.push({relation: 'below', level: i, nodes})
    }
    
    return data
  }
}
