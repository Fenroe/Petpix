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

export async function continueWithGoogle () {
  const result = await signInWithPopup(auth, googleProvider)
  return result
}

export async function emailSignup (email, password, errorHandler) {
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
    errorHandler(error.message) || console.log(error.message)
  }
}

export async function emailLogin (email, password, errorHandler) {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    switch (error.code) {
      case 'auth/user-not-found': {
        errorHandler('We couldn\'t find an account using this email')
        break
      }
      default : {
        errorHandler('Sorry, we couldn\'t verify your login details')
        break
      }
    }
  }
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

export async function uploadAlbumCover (picture) {
  if (picture === null) return
  const uid = auth.currentUser.uid
  const imageRef = ref(storage, `${uid}/albumcovers/${v4()}`)
  await uploadBytes(imageRef, picture)
  return imageRef
}

export async function getURL (ref) {
  const pictureURL = await getDownloadURL(ref)
  return pictureURL
}

export const snapQuery = query(collection(db, 'snaps'), where('id', '!=', 'test'), limit(25))

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

export function deleteSnap (snapId) {
  deleteDoc(doc(db, 'snaps', snapId))
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

export async function fetchAlbum (id, callback) {
  const docRef = doc(db, 'albums', id)
  const albumData = await getDoc(docRef)
  const album = {
    ...albumData.data(),
    posted: albumData.data().posted.toDate(),
    updated: albumData.data().updated.toDate()
  }
  callback(album)
}

export async function fetchAlbums (callback) {
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

export async function createAlbum (title, albumCover, userId, username, profilePicture) {
  const docRef = await addDoc(albumCollection, {})
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

export async function pinAlbum (albumId, userId) {
  await updateDoc(doc(db, 'albums', albumId), {
    pinnedBy: arrayUnion(userId)
  })
}

export async function unpinAlbum (albumId, userId) {
  await updateDoc(doc(db, 'albums', albumId), {
    pinnedBy: arrayRemove(userId)
  })
}

export async function deleteAlbum (id) {
  deleteDoc(doc(db, 'albums', id))
}
