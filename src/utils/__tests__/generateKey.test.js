import generateKey from '../generateKey'

let generateKeyTestObject = ''

beforeAll(() => {
  generateKeyTestObject = generateKey()
})

test('happy path', () => {
  expect(generateKeyTestObject.next().value).toBe(0)
})

test('happy path 2', () => {
  expect(generateKeyTestObject.next().value).toBe(1)
})

test('does not reset', () => {
  expect(generateKeyTestObject.next().value).not.toBe(0)
})
