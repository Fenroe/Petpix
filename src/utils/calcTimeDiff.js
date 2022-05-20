function checkDateObject (date) {
  if (date instanceof Date && !isNaN(date)) return true
  return false
}

function calcMinutes (earlierDate, laterDate) {
  if (!checkDateObject(earlierDate) || !checkDateObject(laterDate)) throw new Error('Parameters include invalid Date objects')
  let minutes = (laterDate.getTime() - earlierDate.getTime()) / 1000
  minutes /= 60
  return Math.abs(Math.floor(minutes))
}

function calcHours (earlierDate, laterDate) {
  if (!checkDateObject(earlierDate) || !checkDateObject(laterDate)) throw new Error('Parameters include invalid Date objects')
  const hours = Math.abs(laterDate - earlierDate) / 36e5
  return Math.floor(hours)
}

function calcDays (earlierDate, laterDate) {
  if (!checkDateObject(earlierDate) || !checkDateObject(laterDate)) throw new Error('Parameters include invalid Date objects')
  let days = (laterDate.getTime() - earlierDate.getTime())
  days /= (1000 * 3600 * 24)
  return Math.abs(Math.floor(days))
}

export {
  calcMinutes,
  calcHours,
  calcDays
}
