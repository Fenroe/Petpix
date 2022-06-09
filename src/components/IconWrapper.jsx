import React from 'react'
import PropTypes from 'prop-types'

export const IconWrapper = ({ icon }) => {
  return (
    <div className="icon-wrapper">
      {icon}
    </div>
  )
}

IconWrapper.propTypes = {
  icon: PropTypes.element
}
