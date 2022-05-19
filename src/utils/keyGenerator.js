function * generateKey () {
  let key = 0
  while (true) {
    key += 1
    yield key
  }
}

export default generateKey
