export { buildBreadcrumbs }

function buildBreadcrumbs(path) {
  const parts = path.split('/')

  return path.split('/')
    .map((part, i) => `<a href="root://${parts.slice(1, i + 1).join('/')}">${part}</a>`)
    .join('/')
}
