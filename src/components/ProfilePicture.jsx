import React from 'react'
import PropTypes from 'prop-types'
import { assignSize } from '../utils/assignSize'
import profile from '../assets/defaults/profile.jpg'

export const ProfilePicture = ({ url, size }) => {
  return (
    <img src={url || profile} className={assignSize(size)} />
  )
}

ProfilePicture.propTypes = {
  url: PropTypes.string,
  size: PropTypes.oneOf(['x-small', 'small', 'large'])
}
