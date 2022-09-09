import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { MyAlbums } from '../components/MyAlbums'
import { ExploreAlbums } from '../components/ExploreAlbums'
import { auth } from '../firebase'
import { useAuthUser } from '@react-query-firebase/auth'

export const Albums = () => {
  const [viewing, setViewing] = useState('my albums')

  const user = useAuthUser('user', auth)

  return (
    <section>
      <div className="page-heading-wrapper">
        <h1 className="page-heading text-center">Albums</h1>
      </div>
      <div className="view-btn-wrapper">
        <button className="view-btn" onClick={() => setViewing('my albums')}>
          <h2 className="view-btn-text">My Albums</h2>
        </button>
        <button className="view-btn" onClick={() => setViewing('explore')}>
          <h2 className="view-btn-text">Explore Albums</h2>
        </button>
      </div>
      { viewing === 'my albums' && <MyAlbums userId={user.data.uid} />}
      { viewing === 'explore' && <ExploreAlbums />}
    </section>
  )
}

Albums.propTypes = {
  userAlbums: PropTypes.array,
  pinnedAlbums: PropTypes.array
}
