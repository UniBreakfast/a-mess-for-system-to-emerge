export { FileManager }

import { getFileList } from './get-file-list.js'
import { buildEntityItem } from './build-entity-item.js'
import { buildBreadcrumbs } from './build-breadcrumbs.js'

class FileManager {
  cache = {}

  settleAt(parent) {
    this.parent = parent
  }

  render() {
    const div = document.createElement('div')
    const breadcrumbs = document.createElement('div')
    const ul = document.createElement('ul')

    this.parent.replaceChildren(div)
    this.el = div
    div.append(breadcrumbs, ul)
    Object.assign(this, { ul, breadcrumbs })
    div.className = 'file-manager'
    breadcrumbs.className = 'breadcrumbs'
    ul.className = 'file-list'

    this.addListeners()

    if (this.path) this.goTo(this.path)
  }

  getData(path) {
    if (this.cache[path]) return this.cache[path]

    return this.cache[path] = getFileList(path)
  }

  async goTo(path) {
    const list = await this.getData(path)
    const { breadcrumbs, ul } = this

    this.path = path

    if (breadcrumbs) breadcrumbs.innerHTML = buildBreadcrumbs(path)
    if (ul) ul.innerHTML = list.map(buildEntityItem.bind(path)).join('')
  }

  addListeners() {
    this.el.addEventListener('click', e => {
      if (e.target.tagName !== 'A') return

      e.preventDefault()
      this.goTo('.' + e.target.href.slice(6))
    }, true)
  }
}
