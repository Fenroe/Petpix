import returnFeedMessage from '../returnFeedMessage'

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
  expect(returnFeedMessage('albums')).toBe('You haven\'t created any albums yet.')
})

test('returns message for Notifications', () => {
  expect(returnFeedMessage('notifications')).toBe('You\'re up to date on your notifications')
})

test('returns message for Messages', () => {
  expect(returnFeedMessage('messages')).toBe('Your message history is empty')
})

test('throws error with invalid parameters', () => {
  expect(() => returnFeedMessage()).toThrow('Missing or invalid feed parameter')
})

test('throws error with invalid parameters #2', () => {
  expect(() => returnFeedMessage('login')).toThrow('Missing or invalid feed parameter')
})
