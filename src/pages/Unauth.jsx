import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { Loading } from './Loading'
import { useAuthUser } from '@react-query-firebase/auth'

export const Unauth = ({ children }) => {
  const navigate = useNavigate()

  const user = useAuthUser('user', auth)

  if (user.isLoading) {
    return <Loading />
  }

  if (!user.data) {
    return children
  }

  navigate('/')
}

Unauth.propTypes = {
  children: PropTypes.any
}
