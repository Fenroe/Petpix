import bananaProfilePicture from '../assets/profilePictures/banana.jpg'
import defaultProfilePicture from '../assets/profilePictures/default.jpg'

export const notificationsData = [
  {
    id: 0,
    fromUser: 'banana13',
    profilePicture: bananaProfilePicture,
    action: 'follow',
    url: '',
    timestamp: new Date(2022, 4, 20)
  },
  {
    id: 1,
    fromUser: 'BobbyB',
    profilePicture: defaultProfilePicture,
    action: 'like',
    url: '',
    timestamp: new Date(2022, 4, 21)
  }
]
