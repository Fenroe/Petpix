const checkDateObject = (date) => {
  if (date instanceof Date && !isNaN(date)) return true
  return false
}

const calcMinutes = (earlierDate, laterDate) => {
  if (!checkDateObject(earlierDate) || !checkDateObject(laterDate)) throw new Error('Parameters include invalid Date objects')
  let minutes = (laterDate.getTime() - earlierDate.getTime()) / 1000
  minutes /= 60
  return Math.abs(Math.floor(minutes))
}

const calcHours = (earlierDate, laterDate) => {
  if (!checkDateObject(earlierDate) || !checkDateObject(laterDate)) throw new Error('Parameters include invalid Date objects')
  const hours = Math.abs(laterDate - earlierDate) / 36e5
  return Math.floor(hours)
}

const calcDays = (earlierDate, laterDate) => {
  if (!checkDateObject(earlierDate) || !checkDateObject(laterDate)) throw new Error('Parameters include invalid Date objects')
  let days = (laterDate.getTime() - earlierDate.getTime())
  days /= (1000 * 3600 * 24)
  return Math.abs(Math.floor(days))
}

export const renderTimeDifference = (earlierDate, laterDate) => {
  const currentTime = laterDate || new Date()
  if (!checkDateObject(earlierDate) || !checkDateObject(currentTime)) throw new Error('Parameters include invalid Date objects')
  const timeInDays = calcDays(earlierDate, currentTime)
  if (timeInDays > 0) {
    if (timeInDays > 1) return `${timeInDays} days ago`
    return 'a day ago'
  }
  const timeInHours = calcHours(earlierDate, currentTime)
  if (timeInHours > 0) {
    if (timeInHours > 1) return `${timeInHours} hours ago`
    return 'an hour ago'
  }
  const timeInMinutes = calcMinutes(earlierDate, currentTime)
  if (timeInMinutes > 1) return `${timeInMinutes} minutes ago`
  return 'just now'
}
