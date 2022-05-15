import React from 'react'
import PropTypes from 'prop-types'

export default function IconWrapper ({ icon, url }) {
  return (
    <a href={url} className="flex justify-center items-center h-14 w-14 hover:cursor-pointer text-3xl">
      {icon}
    </a>
  )
}

IconWrapper.propTypes = {
  icon: PropTypes.element,
  url: PropTypes.string
}
