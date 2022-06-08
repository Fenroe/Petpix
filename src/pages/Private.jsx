import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export const Private = ({ children }) => {
  const [loaded, setLoaded] = useState(false)

  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const loading = setTimeout(() => {
      setLoaded(true)
      if (loaded === true) {
        clearTimeout(loading)
      }
    }, 500)
  }, [])

  if (loaded === false) {
    return <h1>Loading</h1>
  }

  if (loaded === true && currentUser === null) {
    return <Navigate to="signup" />
  }

  if (loaded === true && currentUser !== null) {
    return children
  }
}

Private.propTypes = {
  children: PropTypes.any
}
