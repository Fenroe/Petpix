import React from 'react'
import PropTypes from 'prop-types'
import IconWrapper from './IconWrapper'

export default function HeaderLink ({ icon, url, text }) {
  return (
    <a href={url} className="flex items-center hover:cursor-pointer bg-white rounded-full hover:brightness-95">
      <IconWrapper icon={icon} />
      <span className="hidden text-rg font-semibold xl:flex">{text}</span>
    </a>
  )
}

HeaderLink.propTypes = {
  icon: PropTypes.element,
  url: PropTypes.string,
  text: PropTypes.string
}
