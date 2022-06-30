export { RelationMap }

import { MapList } from './map-list.js'

class RelationMap extends EventTarget {
  constructor(data) {
    super()

    this.levels = [
      new MapList(data[0]), new MapList(data[1]),
      new MapList(data[2]),
      new MapList(data[3]), new MapList(data[4]),
    ]
  }

  get nodes() {
    return this.levels.flatMap(list => list.nodes)
  }

  listen() {
    this.el?.addEventListener('mouseover', e => {
      const event = new CustomEvent('hover')

      event.sourceEvent = e

      if (e.target.classList.contains('map-node')) {
        event.targetNode = this.nodes.find(node => node.el == e.target)
      }

      this.dispatchEvent(event)
    })
  }

  settleAt(parent) {
    this.parent = parent
  }

  render() {
    if (!this.el) {
      const div = document.createElement('div')

      div.classList.add('relation-map')
      this.el = div
    }

    if (this.parent) {
      this.parent.replaceChildren(this.el)
    }

    this.el.replaceChildren(...this.levels.map(level => {
      level.settleAt(this.el)
      return level.render()
    }))
  }

  quenchAll() {
    this.nodes.forEach(node => node.extinguish())
  }

  lightUpRelated(label) {
    this.quenchAll()

    const node = label && this.findNode(label)

    if (!node) return
    
    const labelsToLight = [...node.relatives]
    const labelsProcessed = [label]

    while (labelsToLight.length) {
      const label = labelsToLight.pop()

      labelsProcessed.push(label)

      const node = this.findNode(label)

      if (node) {
        labelsToLight.push(...node.relatives)
        node.lightUp()
      }
    }
  }

  findNode(label) {
    return this.nodes.find(node => node.label == label)
  }
}
