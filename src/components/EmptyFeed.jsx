import React from 'react'
import PropTypes from 'prop-types'

export const EmptyFeed = ({ message }) => {
  return (
    <div className="flex flex-col items-center m-5 p-3 border rounded-full">
      <h1 className="font-bold text-2xl dark:text-white">{message}</h1>
    </div>
  )
}

EmptyFeed.propTypes = {
  message: PropTypes.string
}
