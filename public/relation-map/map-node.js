export { MapNode }

class MapNode {
  constructor(label='unnamed node', level=0, relatives = []) {
    Object.assign(this, {label, level, relatives, lit: false})
  }

  settleAt(parent) {
    this.parent = parent
  }

  render() {
    if (!this.el) {
      const hN = document.createElement(`h${this.level + 2}`)

      hN.className = 'map-node' + (this.lit ? ' lit' : '')
      hN.append(hN.title = this.label)
      this.el = hN
    }

    if (this.parent) {
      this.parent.replaceChildren(this.el)
    }

    return this.el
  }

  extinguish() {
    this.el?.classList.remove('lit')
    this.lit = false
  }

  lightUp() {
    this.el?.classList.add('lit')
    this.lit = true
  }
}
