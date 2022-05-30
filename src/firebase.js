import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

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
      profilePicture: 'https://firebasestorage.googleapis.com/v0/b/snapshot-96f38.appspot.com/o/default.jpg?alt=media&token=03d58bcb-440c-4115-81a7-aec2ea37f691',
      coverPicture: 'https://firebasestorage.googleapis.com/v0/b/snapshot-96f38.appspot.com/o/defaultCover.png?alt=media&token=2897f1cc-ceac-4fb1-a483-a65d7ed19ad1',
      bio: '',
      location: '',
      joinedOn: new Date(),
      snaps: [],
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

export async function getUserData (id, callback) {
  try {
    const docRef = doc(db, 'users', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      callback(docSnap.data())
    }
  } catch (error) {
    console.log(error.message)
  }
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
