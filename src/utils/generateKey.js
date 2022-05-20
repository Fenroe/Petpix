function * generateKey () {
  let key = 0
  while (true) {
    yield key
    key += 1
  }
}

export default generateKey
