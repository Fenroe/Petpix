import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function Loading () {
  const navigate = useNavigate()

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user !== null) {
          navigate('/home')
        } else {
          navigate('signup')
        }
      }),
    []
  )
  return (
    <h1>Loading</h1>
  )
}
