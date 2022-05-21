import assignSize from '../assignSize'

test('returns x-small', () => {
  expect(assignSize('x-small')).toBe('profile-picture-x-small')
})

test('returns small', () => {
  expect(assignSize('small')).toBe('profile-picture-small')
})

test('returns large', () => {
  expect(assignSize('large')).toBe('profile-picture-large')
})

test('throws error', () => {
  expect(() => assignSize()).toThrow('Invalid parameter provided')
})
