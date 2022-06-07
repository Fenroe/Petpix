import { returnFeedMessage } from '../returnFeedMessage'

test('returns message for ProfileP', () => {
  expect(returnFeedMessage('profile')).toBe('You haven\'t posted any Snaps yet.')
})

test('returns message for Home', () => {
  expect(returnFeedMessage('home')).toBe('No Snaps to show. Something might have gone wrong.')
})

test('returns message for Likes', () => {
  expect(returnFeedMessage('likes')).toBe('You haven\'t liked any Snaps yet.')
})

test('returns message for Albums', () => {
  expect(returnFeedMessage('my albums')).toBe('You haven\'t created any albums yet.')
})

test('returns message for Pinned Albums', () => {
  expect(returnFeedMessage('pinned albums')).toBe('You haven\'t pinned any albums yet')
})

test('returns message for Notifications', () => {
  expect(returnFeedMessage('notifications')).toBe('You have no new notifications')
})

test('returns message for Messages', () => {
  expect(returnFeedMessage('messages')).toBe('Your message history is empty')
})

test('throws error with undefined feedName', () => {
  expect(() => returnFeedMessage()).toThrow('feedName is undefined')
})

test('throws error with invalid feedName', () => {
  expect(() => returnFeedMessage('login')).toThrow('\'login\' isn\'t a valid feed name')
})
