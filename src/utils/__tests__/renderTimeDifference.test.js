import renderTimeDifference from '../renderTimeDifference'

const startOfYear = new Date(2018, 0, 1, 0, 0, 0, 0)
const oneSecondLater = new Date(2018, 0, 1, 0, 0, 1)
const oneMinuteLater = new Date(2018, 0, 1, 0, 1)
const fiveMinutesLater = new Date(2018, 0, 1, 0, 5)
const oneHourLater = new Date(2018, 0, 1, 1)
const fiveHoursLater = new Date(2018, 0, 1, 5)
const oneDayLater = new Date(2018, 0, 2)
const fiveDaysLater = new Date(2018, 0, 6)
const badDate = new Date('Bad Date')
const randomObject = { isDate: false }
const randomNumber = 123456

test('returns just now #1', () => {
  expect(renderTimeDifference(startOfYear, oneSecondLater)).toBe('just now')
})

test('returns just now #2', () => {
  expect(renderTimeDifference(startOfYear, oneMinuteLater)).toBe('just now')
})

test('returns five minutes ago', () => {
  expect(renderTimeDifference(startOfYear, fiveMinutesLater)).toBe('5 minutes ago')
})

test('returns an hour ago', () => {
  expect(renderTimeDifference(startOfYear, oneHourLater)).toBe('an hour ago')
})

test('returns five hours ago', () => {
  expect(renderTimeDifference(startOfYear, fiveHoursLater)).toBe('5 hours ago')
})

test('return a day ago', () => {
  expect(renderTimeDifference(startOfYear, oneDayLater)).toBe('a day ago')
})

test('return five days ago', () => {
  expect(renderTimeDifference(startOfYear, fiveDaysLater)).toBe('5 days ago')
})

test('throws on bad date #1', () => {
  expect(() => renderTimeDifference(startOfYear, badDate)).toThrow('Parameters include invalid Date objects')
})

test('throws on bad date #2', () => {
  expect(() => renderTimeDifference(badDate, randomObject)).toThrow('Parameters include invalid Date objects')
})

test('throws on bad date #3', () => {
  expect(() => renderTimeDifference(randomObject, randomNumber)).toThrow('Parameters include invalid Date objects')
})
