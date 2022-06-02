import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, getDoc, onSnapshot, deleteDoc, where, limit, query, collection, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import { useCollectionData } from 'react-firebase-hooks/firestore'

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
      profilePicture: '',
      coverPicture: '',
      bio: '',
      location: '',
      joinedOn: new Date(),
      followedBy: [],
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

export async function appSignOut () {
  await signOut(auth)
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

export async function getProfileData (uid) {
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) return docSnap.data()
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
  const imageRef = ref(storage, `${uid}/profile`)
  await uploadBytes(imageRef, picture)
  return imageRef
}

export async function uploadCoverPicture (picture) {
  if (picture === null) return
  const uid = auth.currentUser.uid
  const imageRef = ref(storage, `${uid}/cover`)
  await uploadBytes(imageRef, picture)
  return imageRef
}

export async function uploadSnapPicture (picture) {
  if (picture === null) return
  const uid = auth.currentUser.uid
  const imageRef = ref(storage, `${uid}/snaps/${v4()}`)
  await uploadBytes(imageRef, picture)
  return imageRef
}

export async function getURL (ref) {
  const pictureURL = await getDownloadURL(ref)
  return pictureURL
}

export const snapQuery = query(collection(db, 'snaps'), where('id', '!=', 'test'), limit(25))

export function fetchSnaps (callback) {
  const snapQuery = query(collection(db, 'snaps'), where('id', '!=', 'test'), limit(25))
  const [messages] = useCollectionData(snapQuery)
  const snaps = []
  messages.forEach((doc) => {
    const snap = {
      id: doc.id,
      userId: doc.userId,
      username: doc.username,
      profilePicture: doc.profilePicture,
      posted: doc.posted.toDate(),
      image: doc.image,
      text: doc.text,
      likedBy: doc.likedBy
    }
    snaps.push(snap)
  })
  callback(snaps)
}

export async function postSnap (docRef, username, profilePicture, image, text) {
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

export async function deleteSnap (snapId) {
  await deleteDoc(doc(db, 'snaps', snapId))
}

export async function likeSnap (snapId, userId) {
  await updateDoc(doc(db, 'snaps', snapId), {
    likedBy: arrayUnion(userId)
  })
}

export async function unlikeSnap (snapId, userId) {
  await updateDoc(doc(db, 'snaps', snapId), {
    likedBy: arrayRemove(userId)
  })
}
