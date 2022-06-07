import React from 'react'
import ReactDOM from 'react-dom'
import { CreateSnap } from './CreateSnap'
import PropTypes from 'prop-types'
import { MdOutlineClose } from 'react-icons/md'

export const SidebarSnapModal = ({ closeModal }) => {
  return ReactDOM.createPortal(
    <>
      <div className="bg-black bg-opacity-50 fixed inset-0 z-40"/>
      <div className="flex flex-col bg-white fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 p-3 w-[480px] h-auto rounded-lg overflow-auto">
      <div className="flex gap-12 text-2xl mb-3">
          <button onClick={closeModal}><MdOutlineClose /></button>
          <h1 className="font-bold text-lg">Compose your snap</h1>
        </div>
        <CreateSnap />
      </div>
    </>, document.getElementById('modal')
  )
}

SidebarSnapModal.propTypes = {
  closeModal: PropTypes.func
}
