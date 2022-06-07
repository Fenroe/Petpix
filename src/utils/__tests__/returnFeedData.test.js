import { returnFeedData } from '../returnFeedData'

const undefinedData = undefined

test('returns empty array', () => {
  expect(returnFeedData()).toStrictEqual([])
})

test('returns empty array with undefined', () => {
  expect(returnFeedData(undefinedData)).toStrictEqual([])
})

test('returns parameter if parameter is array', () => {
  expect(returnFeedData(['a', 'b', 'c'])).toStrictEqual(['a', 'b', 'c'])
})

test('does not return parameter if not an array', () => {
  expect(returnFeedData('a, b, c')).toStrictEqual([])
})
