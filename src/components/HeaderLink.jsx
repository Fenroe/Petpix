import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { IconWrapper } from './IconWrapper'

export const HeaderLink = ({ icon, url, text }) => {
  return (
    <Link to={url} className="flex items-center hover:cursor-pointer bg-white rounded-full hover:brightness-95">
      <IconWrapper icon={icon} />
      <span className="hidden text-rg font-semibold xl:flex">{text}</span>
    </Link>
  )
}

HeaderLink.propTypes = {
  icon: PropTypes.element,
  url: PropTypes.string,
  text: PropTypes.string
}
