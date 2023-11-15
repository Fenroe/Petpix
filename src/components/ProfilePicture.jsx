import React from 'react'
import PropTypes from 'prop-types'
import { assignSize } from '../utils/assignSize'
import profile from '../assets/defaults/profile.png'

export const ProfilePicture = ({ url, size }) => {
  return (
    <img src={url || profile} className={`${assignSize(size)} bg-neutral-100 dark:bg-neutral-900`} />
  )
}

ProfilePicture.propTypes = {
  url: PropTypes.string,
  size: PropTypes.oneOf(['x-small', 'small', 'large'])
}
