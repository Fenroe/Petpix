export default function returnFeedMessage (feed) {
  let message = ''
  switch (feed) {
    case 'profile': {
      message = 'You haven\'t posted any Snaps yet.'
      break
    }
    case 'home': {
      message = 'No Snaps to show. Something might have gone wrong.'
      break
    }
    case 'likes': {
      message = 'You haven\'t liked any Snaps yet.'
      break
    }
    case 'albums': {
      message = 'You haven\'t created any albums yet.'
      break
    }
    case 'notifications': {
      message = 'You have no new notifications'
      break
    }
    case 'messages': {
      message = 'Your message history is empty'
      break
    }
  }
  if (message !== '') return message
  throw new Error('Missing or invalid feed parameter')
}
