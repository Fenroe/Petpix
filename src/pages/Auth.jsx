import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { Loading } from './Loading'
import { useAuthUser } from '@react-query-firebase/auth'

export const Auth = ({ children }) => {
  const navigate = useNavigate()

  const user = useAuthUser('user', auth)

  if (user.isLoading) {
    return <Loading />
  }

  if (user.data) {
    return children
  }

  navigate('signup')
}

Auth.propTypes = {
  children: PropTypes.any
}
