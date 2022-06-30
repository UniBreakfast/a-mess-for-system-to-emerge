export { buildEntityItem }

function buildEntityItem(entity) {
  const {name, isFolder} = entity
  
  return `
    <li class=${isFolder ? 'folder' : 'file'}>
      ${isFolder
      ? `<a href="root://${this.slice(2)}/${name}">${name}</a>`
      : `<span>${name}</span>`}
    </li>
  `
}
