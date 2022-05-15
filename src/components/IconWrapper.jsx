import React from 'react'
import PropTypes from 'prop-types'

export default function IconWrapper ({ icon }) {
  return (
    <div className="icon-wrapper">
      {icon}
    </div>
  )
}

IconWrapper.propTypes = {
  icon: PropTypes.element,
  url: PropTypes.string,
  text: PropTypes.string
}
