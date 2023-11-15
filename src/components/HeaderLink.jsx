import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { IconWrapper } from './IconWrapper'

export const HeaderLink = ({ icon, url, text }) => {
  return (
    <Link to={url} className="flex items-center hover:cursor-pointer bg-neutral-100 dark:bg-neutral-900 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800">
      <IconWrapper icon={icon} />
      <span className="hidden text-rg font-semibold xl:flex dark:text-neutral-100">{text}</span>
    </Link>
  )
}

HeaderLink.propTypes = {
  icon: PropTypes.element,
  url: PropTypes.string,
  text: PropTypes.string
}
