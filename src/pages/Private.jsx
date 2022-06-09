import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { Loading } from './Loading'

export const Private = ({ children }) => {
  const [user, loading] = useAuthState(auth)

  if (loading) {
    return <Loading />
  }

  if (user) {
    return children
  }

  return <Navigate to="signup" />
}

Private.propTypes = {
  children: PropTypes.any
}
