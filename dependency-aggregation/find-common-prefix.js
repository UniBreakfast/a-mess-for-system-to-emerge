module.exports = { findCommonPrefix }

function findCommonPrefix(strings, separator) {
  const [first, ...rest] = strings
  const parts = first.split(separator)

  let prefix = ''
  let possiblePrefix = parts.shift()

  while (rest.every(str => str.startsWith(possiblePrefix))) {
    prefix = possiblePrefix
    possiblePrefix += separator + parts.shift()
  }

  return prefix
}
