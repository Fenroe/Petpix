function checkDateObject (date) {
  if (date instanceof Date && !isNaN(date)) return true
  return false
}

export const returnMonthAndYear = (date) => {
  if (!checkDateObject(date)) throw new Error('Invalid date')
  const options = { year: 'numeric', month: 'long' }
  return new Intl.DateTimeFormat('en-US', options).format(date)
}
