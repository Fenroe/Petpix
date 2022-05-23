import bird from '../assets/pets/bird.png'
import bunny from '../assets/pets/bunny.png'
import cat from '../assets/pets/cat.png'
import dog from '../assets/pets/dog.png'
import fox from '../assets/pets/fox.png'
import hamster from '../assets/pets/hamster.png'
import kitten from '../assets/pets/kitten.png'
import banana from '../assets/profilePictures/banana.jpg'
import giles from '../assets/profilePictures/giles.jpg'
import defaultPicture from '../assets/profilePictures/default.jpg'
import theRock from '../assets/profilePictures/the-rock.jpg'
import manyCats from '../assets/pets/many-cats.jpg'

export const snapCollection = [
  {
    id: 0,
    userProfilePicture: banana,
    username: 'Banana13',
    timestamp: new Date(2022, 4, 20),
    image: kitten,
    text: '',
    likes: 37
  },
  {
    id: 1,
    userProfilePicture: giles,
    username: 'Giles',
    timestamp: new Date(2022, 4, 13),
    image: bird,
    text: 'This website sucks',
    likes: 52
  },
  {
    id: 2,
    userProfilePicture: defaultPicture,
    username: 'Proud Mom',
    timestamp: new Date(2022, 4, 13),
    image: hamster,
    text: '',
    likes: 5
  },
  {
    id: 3,
    userProfilePicture: defaultPicture,
    username: 'Testers',
    timestamp: new Date(2022, 4, 12),
    image: bunny,
    text: 'This is a test',
    likes: 0
  },
  {
    id: 4,
    userProfilePicture: defaultPicture,
    username: 'Yesters',
    timestamp: new Date(2022, 4, 17),
    image: dog,
    text: 'This is a yest',
    likes: 3
  },
  {
    id: 5,
    userProfilePicture: defaultPicture,
    username: 'Besters',
    timestamp: new Date(2022, 4, 15),
    image: cat,
    text: 'im best boy',
    likes: 1
  },
  {
    id: 6,
    userProfilePicture: defaultPicture,
    username: 'BobbyB',
    timestamp: new Date(2022, 4, 18),
    image: fox,
    text: 'Where you at',
    likes: 13
  },
  {
    id: 7,
    userProfilePicture: theRock,
    username: 'The Rock',
    timestamp: new Date(2022, 4, 22),
    image: manyCats,
    text: 'Jabroni',
    likes: 2
  }
]
