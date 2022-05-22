import returnNotificationText from '../returnNotificationText'

const userOne = 'Tester'
const userTwo = 'Mocksy'

test('returns message on like #1', () => {
  expect(returnNotificationText('like', userOne)).toBe('Tester liked your Snap')
})
test('returns message on like #1', () => {
  expect(returnNotificationText('like', userTwo)).toBe('Mocksy liked your Snap')
})
test('returns message on follow #1', () => {
  expect(returnNotificationText('follow', userOne)).toBe('Tester is now following you')
})
test('returns message on follow #1', () => {
  expect(returnNotificationText('follow', userTwo)).toBe('Mocksy is now following you')
})
test('throws on invalid action', () => {
  expect(() => returnNotificationText('something dumb and invalid', userOne)).toThrow()
})
