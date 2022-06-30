export { MapList }

import { MapNode } from './map-node.js'

class MapList {
  constructor(data) {
    this.data = typeof data == 'string' ? { nodes: { [data]: [] } } : data
    this.nodes = Object.entries(this.data.nodes).map(
      ([label, relatives]) => new MapNode(label, this.data.level, relatives)
    )
  }

  settleAt(parent) {
    this.parent = parent
  }

  render() {
    if (!this.el) {
      const ul = document.createElement('ul')
      const { relation = '', level = 0 } = this.data

      ul.className = `map-list level${level} ${relation}`
      this.el = ul
    }

    if (this.parent) {
      this.parent.replaceChildren(this.el)
    }

    this.el.replaceChildren(
      ...this.nodes.map(node => {
        const li = document.createElement('li')

        li.className = 'node-place'
        node.settleAt(li)
        node.render()

        return li
      })
    )

    return this.el
  }
}
