import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, getDoc, deleteDoc, where, limit, query, collection, updateDoc, arrayRemove, arrayUnion, addDoc, getDocs } from 'firebase/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'

const firebaseConfig = {
  apiKey: 'AIzaSyAJ2sqwblxzNkKbquXWtwMYfBSP04HUU1s',
  authDomain: 'snapshot-18036.firebaseapp.com',
  projectId: 'snapshot-18036',
  storageBucket: 'snapshot-18036.appspot.com',
  messagingSenderId: '98634335563',
  appId: '1:98634335563:web:84c711882e2d15a54954ce'
}

export const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const storage = getStorage(app)

export const googleProvider = new GoogleAuthProvider()

export const auth = getAuth(app)

export const snapCollection = collection(db, 'snaps')

export const albumCollection = collection(db, 'albums')

export const continueWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, googleProvider)
  return userCredential
}

export const checkIfUserExists = async () => {
  const userRef = doc(db, 'users', auth.currentUser.uid)
  const userDoc = await getDoc(userRef)
  if (!userDoc.exists()) {
    createUser()
  }
}

export const emailSignup = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  return userCredential
}

export const emailLogin = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential
}

export const createUser = () => {
  const uid = auth.currentUser.uid
  setDoc(doc(db, 'users', uid), {
    username: '',
    userId: uid,
    profilePicture: '',
    coverPicture: '',
    bio: '',
    location: '',
    joinedOn: new Date(),
    followedBy: [],
    hiddenSnaps: [],
    setup: false
  })
}

export const addEmail = (email) => {
  const uid = auth.currentUser.uid
  setDoc(doc(db, 'emails', email), {
    userId: uid
  })
}

export const appSignOut = async () => {
  await signOut(auth)
}

export const getUserData = async (callback) => {
  try {
    const uid = auth.currentUser.uid
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      callback(docSnap.data())
    }
  } catch (error) {
    console.log(error.message)
  }
}

export const getProfileData = async (uid) => {
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) return docSnap.data()
}

export const updateUserData = async (state) => {
  try {
    await setDoc(doc(db, 'users', state.userId), {
      state
    })
  } catch (error) {
    console.log(error.message)
  }
}

export const uploadProfilePicture = async (picture) => {
  if (picture === null) return
  const uid = auth.currentUser.uid
  const imageRef = ref(storage, `${uid}/profile`)
  await uploadBytes(imageRef, picture)
  return imageRef
}

export const uploadCoverPicture = async (picture) => {
  if (picture === null) return
  const uid = auth.currentUser.uid
  const imageRef = ref(storage, `${uid}/cover`)
  await uploadBytes(imageRef, picture)
  return imageRef
}

export const uploadSnapPicture = async (picture) => {
  if (picture === null) return
  const uid = auth.currentUser.uid
  const imageRef = ref(storage, `${uid}/snaps/${v4()}`)
  await uploadBytes(imageRef, picture)
  return imageRef
}

export const uploadAlbumCover = async (picture) => {
  if (picture === null) return
  const uid = auth.currentUser.uid
  const imageRef = ref(storage, `${uid}/albumcovers/${v4()}`)
  await uploadBytes(imageRef, picture)
  return imageRef
}

export const getURL = async (ref) => {
  const pictureURL = await getDownloadURL(ref)
  return pictureURL
}

export const snapQuery = query(collection(db, 'snaps'), where('id', '!=', 'test'), limit(25))

export const postSnap = async (docRef, username, profilePicture, image, text) => {
  await setDoc(docRef, {
    id: docRef.id,
    userId: auth.currentUser.uid,
    username,
    profilePicture,
    posted: new Date(),
    image,
    text,
    likedBy: []
  })
  return docRef
}

export const getSnapPicture = async (snapId) => {
  const snapRef = doc(db, 'snaps', snapId)
  const snapData = await getDoc(snapRef)
  const snapPicture = snapData.data().image
  return snapPicture
}

export const deleteSnap = (snapId) => {
  deleteDoc(doc(db, 'snaps', snapId))
}

export const hideSnap = (snapId) => {
  updateDoc(doc(db, 'users', auth.currentUser.uid), {
    hiddenSnaps: arrayUnion(snapId)
  })
}

export const likeSnap = async (snapId, userId) => {
  await updateDoc(doc(db, 'snaps', snapId), {
    likedBy: arrayUnion(userId)
  })
}

export const unlikeSnap = async (snapId, userId) => {
  await updateDoc(doc(db, 'snaps', snapId), {
    likedBy: arrayRemove(userId)
  })
}

export const getPinnedAlbums = async (callback) => {
  const albumQuery = query(albumCollection, where('pinnedBy', 'array-contains', auth.currentUser.uid))
  const albumSnapshot = await getDocs(albumQuery)
  const albums = []
  albumSnapshot.forEach((doc) => {
    const album = {
      ...doc.data(),
      posted: doc.data().posted.toDate(),
      updated: doc.data().updated.toDate()
    }
    albums.push(album)
  })
  callback(albums)
}

export const fetchAlbum = async (id, callback) => {
  const docRef = doc(db, 'albums', id)
  const albumData = await getDoc(docRef)
  const album = {
    ...albumData.data(),
    posted: albumData.data().posted.toDate(),
    updated: albumData.data().updated.toDate()
  }
  callback(album)
}

export const fetchAlbums = async (callback) => {
  const albumQuery = query(albumCollection)
  const albumSnapshot = await getDocs(albumQuery)
  const albums = []
  albumSnapshot.forEach((doc) => {
    const album = {
      ...doc.data(),
      posted: doc.data().posted.toDate(),
      updated: doc.data().updated.toDate()
    }
    albums.push(album)
  })
  callback(albums)
}

export const addAlbum = async () => {
  const docRef = await addDoc(albumCollection, {})
  return docRef
}

export const createAlbum = async (title, albumCover, userId, username, profilePicture, docRef) => {
  await updateDoc(docRef, {
    id: docRef.id,
    title,
    userId,
    username,
    profilePicture,
    albumCover,
    posted: new Date(),
    updated: new Date(),
    pinnedBy: [],
    contents: []
  })
}

export const pinAlbum = async (albumId, userId) => {
  await updateDoc(doc(db, 'albums', albumId), {
    pinnedBy: arrayUnion(userId)
  })
}

export const unpinAlbum = async (albumId, userId) => {
  await updateDoc(doc(db, 'albums', albumId), {
    pinnedBy: arrayRemove(userId)
  })
}

export const updateAlbumCover = async (albumId, newAlbumCover) => {
  try {
    const albumRef = doc(db, 'albums', albumId)
    await updateDoc(albumRef, {
      albumCover: newAlbumCover
    })
  } catch (err) {
    console.log(err)
  }
}

export const addPictureToAlbum = async (albumId, picture) => {
  const albumRef = doc(db, 'albums', albumId)
  await updateDoc(albumRef, {
    contents: arrayUnion(picture)
  })
}

export const removePictureFromAlbum = async (albumId, picture) => {
  const albumRef = doc(db, 'albums', albumId)
  await updateDoc(albumRef, {
    contents: arrayRemove(picture)
  })
}

export const deleteAlbum = (id) => {
  deleteDoc(doc(db, 'albums', id))
}

export const getUserDocRef = (id) => doc(db, 'users', id)

export const getUsernameDocRef = (id) => doc(db, 'usernames', id)

export const getSnapDocRef = (id) => doc(db, 'snaps', id)

export const getAlbumDocRef = (id) => doc(db, 'albums', id)

export const followUser = async (id) => {
  const userRef = getUserDocRef(id)
  await updateDoc(userRef, {
    followedBy: arrayUnion(auth.currentUser.uid)
  })
}

export const unfollowUser = async (id) => {
  const userRef = getUserDocRef(id)
  await updateDoc(userRef, {
    followedBy: arrayRemove(auth.currentUser.uid)
  })
}

export const checkUsernameAvailability = async (username) => {
  const usernameRef = getUsernameDocRef(username)
  const usernameDoc = await getDoc(usernameRef)
  if (usernameDoc.exists()) return true
  return false
}

export const addUsername = (username) => {
  setDoc(getUsernameDocRef(username), {
    userId: auth.currentUser.uid
  })
}

export const getProfileAlbums = async (id) => {
  const albumQuery = query(albumCollection, where('userId', '==', id))
  const querySnapshot = await getDocs(albumQuery)
  const albums = []
  querySnapshot.forEach((doc) => {
    const album = {
      ...doc.data(),
      posted: doc.data().posted.toDate(),
      updated: doc.data().updated.toDate()
    }
    albums.push(album)
  })
  return albums
}

export const getLikedSnapsRef = async (userId) => {
  return query(snapCollection, where('likedBy', 'array-contains', userId))
}

export const getUserSnapsRef = async (userId) => {
  return query(snapCollection, where('userId', '==', userId))
}

export const getUserAlbumsRef = async (userId) => {
  return query(albumCollection, where('userId', '==', userId))
}

export const getPinnedAlbumsRef = async (userId) => {
  return query(albumCollection, where('pinnedBy', 'array-contains', userId))
}
