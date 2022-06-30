import { FileManager } from "./file-manager.js"
import { apiCall } from "./api-call.js"
import { buildDependencyTree } from "./build-dependency-tree.js"
import { prepDependencyMapData } from "./prep-dependency-map-data.js"
import { wrapper } from './wrapper.js'
import { RelationMap } from './relation-map/relation-map.js'

apiCall("dependencies").then(pool => {
  const { tree, registry } = buildDependencyTree(pool)
  const { tree: biTree, registry: biRegistry } = buildDependencyTree(pool, { bidirectional: true })

  console.log(tree)
  console.log(registry)
  console.log(biTree)
  console.log(biRegistry)

  let path = './index.js'

  path = './endpoints.js'

  const data = prepDependencyMapData(biRegistry)(path)

  console.log(data)
})

showFileManager()
showDependencyMap()

function showFileManager() {
  const fileManager = new FileManager

  fileManager.settleAt(wrapper)
  fileManager.goTo(".")
  fileManager.render()
}

async function showDependencyMap() {
  const pool = await apiCall("dependencies")
  const { tree, registry } = buildDependencyTree(pool, { bidirectional: true })
  const data = prepDependencyMapData(registry)("./index.js")
  const relationMap = new RelationMap(data)
  
  console.log('👁️👁️ tree, registry', tree, registry)
  console.log('👁️👁️ data', data)

  relationMap.settleAt(wrapper)
  relationMap.render()
  relationMap.listen()

  relationMap.addEventListener('hover', e =>
    relationMap.lightUpRelated(e.targetNode?.label))
}
