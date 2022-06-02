export default function returnFeedMessage (feedName) {
  if (feedName === undefined) throw new Error('feedName is undefined')
  let message = ''
  switch (feedName) {
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
    case 'my albums': {
      message = 'You haven\'t created any albums yet.'
      break
    }
    case 'pinned albums': {
      message = 'You haven\'t pinned any albums yet'
      break
    }
    case 'explore albums': {
      message = 'There are no albums to show'
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
  throw new Error(`'${feedName}' isn't a valid feed name`)
}
