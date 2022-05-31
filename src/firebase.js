import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, getDoc, onSnapshot, addDoc, collection } from 'firebase/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
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

export async function continueWithGoogle () {
  const result = await signInWithPopup(auth, googleProvider)
  return result
}

export async function emailSignup (email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const userId = userCredential.user.uid
    await setDoc(doc(db, 'users', userId), {
      username: '',
      userId, // property shorthand
      profilePicture: 'https://firebasestorage.googleapis.com/v0/b/snapshot-18036.appspot.com/o/defaults%2Fdefault.jpg?alt=media&token=63652fc4-b63f-4326-99fe-b936e7d8baf6',
      coverPicture: 'https://firebasestorage.googleapis.com/v0/b/snapshot-18036.appspot.com/o/defaults%2FdefaultCover.png?alt=media&token=b83e125c-06d2-46a7-b320-a3492ff8d14d',
      bio: '',
      location: '',
      joinedOn: new Date(),
      likes: [],
      albums: [],
      notifications: [],
      followers: 0,
      setup: false
    })
    await setDoc(doc(db, 'emails', email), {
      userId
    })
  } catch (error) {
    console.log(error.message)
  }
}

export async function emailLogin (email, password, errorFunc) {
  const result = await signInWithEmailAndPassword(auth, email, password)
  return result
}

export async function getUserData (callback) {
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

export function listenForUser (callback) {
  const docRef = doc(db, 'users', auth.currentUser.uid)
  const unsub = onSnapshot(docRef, (doc) => {
    callback(doc.data())
  })
  return unsub
}

export async function updateUserData (state) {
  try {
    await setDoc(doc(db, 'users', state.userId), {
      state
    })
  } catch (error) {
    console.log(error.message)
  }
}

export async function uploadProfilePicture (picture) {
  if (picture === null) return
  const uid = auth.currentUser.uid
  const imageRef = ref(storage, `${uid}/profpics/${uid + v4()}`)
  await uploadBytes(imageRef, picture)
  return imageRef
}

export async function uploadCoverPicture (picture) {
  if (picture === null) return
  const uid = auth.currentUser.uid
  const imageRef = ref(storage, `${uid}/coverpics/${uid + v4()}`)
  await uploadBytes(imageRef, picture)
  return imageRef
}

export async function uploadSnapPicture (picture) {
  if (picture === null) return
  const uid = auth.currentUser.uid
  const imageRef = ref(storage, `${uid}/snaps/${uid + v4()}`)
  await uploadBytes(imageRef, picture)
  return imageRef
}

export async function getURL (ref) {
  const pictureURL = await getDownloadURL(ref)
  return pictureURL
}

export async function postSnap (username, profilePicture, image, text) {
  const docRef = await addDoc(collection(db, 'snaps'), {})
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
