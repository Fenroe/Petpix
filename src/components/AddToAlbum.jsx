import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

export const AddToAlbum = ({ close, snapId }) => {
  return ReactDOM.createPortal(
    <>
      <div className="bg-black bg-opacity-50 fixed inset-0 z-40"/>
      <div className="fixed w-52 h-20 bg-white left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50">
        <h1>You haven&apos;t made any albums yet</h1>
      </div>
    </>, document.getElementById('modal')
  )
}

AddToAlbum.propTypes = {
  close: PropTypes.func,
  snapId: PropTypes.string
}
