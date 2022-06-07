export const assignSize = (size) => {
  if (size === 'x-small') return 'profile-picture-x-small'
  if (size === 'small') return 'profile-picture-small'
  if (size === 'large') return 'profile-picture-large'
  throw new Error('Invalid parameter provided')
}
