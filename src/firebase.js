import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, getDoc, deleteDoc, where, limit, query, collection, updateDoc, arrayRemove, arrayUnion, addDoc, getDocs } from 'firebase/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
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

export const getUserAlbums = async (callback) => {
  const albumQuery = query(albumCollection, where('userId', '==', auth.currentUser.uid))
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

export const addPictureToAlbum = async (albumId, snapId) => {
  const snapRef = doc(db, 'snaps', snapId)
  const snapData = await getDoc(snapRef)
  const snapPicture = snapData.data().image
  const albumRef = doc(db, 'albums', albumId)
  await updateDoc(albumRef, {
    contents: arrayUnion(snapPicture)
  })
}

export const removePictureFromAlbum = async (albumId, snapId) => {
  const snapRef = doc(db, 'snaps', snapId)
  const snapData = await getDoc(snapRef)
  const snapPicture = snapData.data().image
  const albumRef = doc(db, 'albums', albumId)
  await updateDoc(albumRef, {
    contents: arrayRemove(snapPicture)
  })
}

export const deleteAlbum = (id) => {
  deleteDoc(doc(db, 'albums', id))
}

export const getUserDocRef = (id) => doc(db, 'users', id)

export const getSnapDocRef = (id) => doc(db, 'snaps', id)

export const getAlbumDocRef = (id) => doc(db, 'albums', id)
