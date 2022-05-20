import { calcMinutes, calcHours, calcDays } from '../calcTimeDiff'

// mock dates
const startOfYear = new Date(2018, 0, 1, 0, 0, 0, 0)
const oneSecondLater = new Date(2018, 0, 1, 0, 0, 1)
const oneMinuteLater = new Date(2018, 0, 1, 0, 1)
const fiftynineMinutesLater = new Date(2018, 0, 1, 0, 59)
const oneHourLater = new Date(2018, 0, 1, 1)
const fiveHoursLater = new Date(2018, 0, 1, 5)
const oneDayLater = new Date(2018, 0, 2)
const fiveDaysLater = new Date(2018, 0, 6)
const badDate = new Date('Bad Date')
const randomObject = { isDate: false }
const randomNumber = 123456

describe('test calcMinutes', () => {
  test('happy path', () => {
    expect(calcMinutes(startOfYear, oneMinuteLater)).toBe(1)
  })
  test('happy path 2', () => {
    expect(calcMinutes(startOfYear, fiftynineMinutesLater)).toBe(59)
  })
  test('returns value less than 1 as 0', () => {
    expect(calcMinutes(startOfYear, oneSecondLater)).toBe(0)
  })
  test('returns identical dates as 0', () => {
    expect(calcMinutes(startOfYear, startOfYear)).toBe(0)
  })
  test('returns correct data type of number', () => {
    expect(typeof calcMinutes(startOfYear, oneMinuteLater)).toBe('number')
  })
  test('throws error on invalid date 1', () => {
    expect(() => calcMinutes(startOfYear, badDate)).toThrow('Parameters include invalid Date objects')
  })
  test('throws error on invalid date 2', () => {
    expect(() => calcMinutes(randomObject, startOfYear)).toThrow('Parameters include invalid Date objects')
  })
  test('throws error on invalid date 3', () => {
    expect(() => calcMinutes(startOfYear, randomNumber)).toThrow('Parameters include invalid Date objects')
  })
})

describe('test calcHours', () => {
  test('happy path', () => {
    expect(calcHours(startOfYear, oneHourLater)).toBe(1)
  })
  test('happy path 2', () => {
    expect(calcHours(startOfYear, fiveHoursLater)).toBe(5)
  })
  test('returns value less than 1 as 0', () => {
    expect(calcHours(startOfYear, fiftynineMinutesLater)).toBe(0)
  })
  test('returns identical dates as 0', () => {
    expect(calcHours(startOfYear, startOfYear)).toBe(0)
  })
  test('returns correct data type', () => {
    expect(typeof calcHours(startOfYear, oneHourLater)).toBe('number')
  })
  test('throws error on invalid date 1', () => {
    expect(() => calcHours(startOfYear, badDate)).toThrow('Parameters include invalid Date objects')
  })
  test('throws error on invalid date 2', () => {
    expect(() => calcHours(randomObject, startOfYear)).toThrow('Parameters include invalid Date objects')
  })
  test('throws error on invalid date 3', () => {
    expect(() => calcHours(startOfYear, randomNumber)).toThrow('Parameters include invalid Date objects')
  })
})

describe('test calcDays', () => {
  test('happy path', () => {
    expect(calcDays(startOfYear, oneDayLater)).toBe(1)
  })
  test('happy path 2', () => {
    expect(calcDays(startOfYear, fiveDaysLater)).toBe(5)
  })
  test('returns value less than 1 as 0', () => {
    expect(calcHours(startOfYear, oneSecondLater)).toBe(0)
  })
  test('returns identical dates as 0', () => {
    expect(calcHours(startOfYear, startOfYear)).toBe(0)
  })
  test('returns correct data type', () => {
    expect(typeof calcHours(startOfYear, oneDayLater)).toBe('number')
  })
  test('throws error on invalid date 1', () => {
    expect(() => calcDays(startOfYear, badDate)).toThrow('Parameters include invalid Date objects')
  })
  test('throws error on invalid date 2', () => {
    expect(() => calcDays(randomObject, startOfYear)).toThrow('Parameters include invalid Date objects')
  })
  test('throws error on invalid date 3', () => {
    expect(() => calcDays(startOfYear, randomNumber)).toThrow('Parameters include invalid Date objects')
  })
})
