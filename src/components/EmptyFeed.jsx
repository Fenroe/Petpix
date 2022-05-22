import React from 'react'
import PropTypes from 'prop-types'

export default function EmptyFeed ({ message }) {
  return (
    <div className="flex flex-col items-center m-5 p-3 border-2">
      <h1 className="font-bold text-2xl">{message}</h1>
    </div>
  )
}

EmptyFeed.propTypes = {
  message: PropTypes.string
}
