export default function * generateKey () {
  let key = 0
  while (true) {
    yield key
    key += 1
  }
}

export const getNewKey = generateKey()
