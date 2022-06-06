import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export const Private = ({ children }) => {
  const { currentUser } = useContext(AuthContext)

  if (currentUser === null) {
    return <Navigate to="signup" />
  }
  return children
}

Private.propTypes = {
  children: PropTypes.any
}
