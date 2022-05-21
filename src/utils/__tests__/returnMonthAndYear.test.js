import returnMonthAndYear from '../returnMonthandYear'

const mockDateJan = new Date(2018, 0)
const mockDateMay = new Date(2016, 4)
const mockDateDec = new Date(2021, 11)
const invalidDate = new Date('invalid date')
const randomString = 'January 2018'

test('returns January 2018', () => {
  expect(returnMonthAndYear(mockDateJan)).toBe('January 2018')
})

test('returns May 2016', () => {
  expect(returnMonthAndYear(mockDateMay)).toBe('May 2016')
})

test('returns December 2021', () => {
  expect(returnMonthAndYear(mockDateDec)).toBe('December 2021')
})

test('throws error on invalid date #1', () => {
  expect(() => returnMonthAndYear(invalidDate)).toThrow()
})

test('throws error on invalid date #2', () => {
  expect(() => returnMonthAndYear(randomString)).toThrow()
})
