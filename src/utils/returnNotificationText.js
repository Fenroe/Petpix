export default function returnNotificationText (action, username) {
  let text = ''
  switch (action) {
    case 'like': {
      text = `${username} liked your Snap`
      break
    }
    case 'follow': {
      text = `${username} is now following you`
      break
    }
  }
  if (text !== '') return text
  throw new Error('Invalid action')
}
