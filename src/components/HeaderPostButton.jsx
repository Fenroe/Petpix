import React from 'react'
import PropTypes from 'prop-types'

export default function HeaderPostButton ({ icon }) {
  return (
    <button className="flex justify-center items-center bg-red-500 w-16 h-16 rounded-full text-4xl text-white lg:w-56">
      <div className="lg:hidden">
        {icon}
      </div>
      <span className="hidden text-3xl lg:flex">Post</span>
    </button>
  )
}

HeaderPostButton.propTypes = {
  icon: PropTypes.element
}
