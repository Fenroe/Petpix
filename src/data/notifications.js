import bananaProfilePicture from '../assets/profilePictures/banana.jpg'
import defaultProfilePicture from '../assets/profilePictures/default.jpg'

export const notifications = [
  {
    fromUser: 'banana13',
    profilePicture: bananaProfilePicture,
    action: 'follow',
    url: '',
    timestamp: new Date(2022, 4, 20)
  },
  {
    fromUser: 'BobbyB',
    profilePicture: defaultProfilePicture,
    action: 'like',
    url: '',
    timestamp: new Date(2022, 4, 21)
  }
]
