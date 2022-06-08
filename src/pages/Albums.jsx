import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { MyAlbums } from '../components/MyAlbums'
import { ExploreAlbums } from '../components/ExploreAlbums'
import { fetchAlbums } from '../firebase'

export const Albums = ({ userAlbums, pinnedAlbums }) => {
  const [viewing, setViewing] = useState('my albums')

  const [exploreAlbumsData, setExploreAlbumsData] = useState([])

  useEffect(() => {
    fetchAlbums(setExploreAlbumsData)
  }, [])

  return (
    <section>
      <div className="page-heading-wrapper">
        <h1 className="page-heading">Albums</h1>
      </div>
      <div className="view-btn-wrapper">
        <button className="view-btn" onClick={() => setViewing('my albums')}>
          <h2 className="view-btn-text">My Albums</h2>
        </button>
        <button className="view-btn" onClick={() => setViewing('explore')}>
          <h2 className="view-btn-text">Explore Albums</h2>
        </button>
      </div>
      { viewing === 'my albums' ? <MyAlbums myAlbums={userAlbums} pinnedAlbums={pinnedAlbums} /> : null}
      { viewing === 'explore' ? <ExploreAlbums feedData={exploreAlbumsData} /> : null}
    </section>
  )
}

Albums.propTypes = {
  userAlbums: PropTypes.array,
  pinnedAlbums: PropTypes.array
}
