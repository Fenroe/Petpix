import React from 'react'
import { PropTypes } from 'prop-types'

export default function IconWrapper ({ icon }) {
  return (
    <div className="flex justify-center items-center h-14 w-14 hover:cursor-pointer text-3xl">
      {icon}
    </div>
  )
}

IconWrapper.propTypes = {
  icon: PropTypes.object
}
