import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { MyAlbums } from '../components/MyAlbums'
import { ExploreAlbums } from '../components/ExploreAlbums'
import { UserContext } from '../data/UserContext'

export const Albums = ({ feedData }) => {
  const [viewing, setViewing] = useState('my albums')

  const [myAlbums, setMyAlbums] = useState([])

  const [pinnedAlbums, setPinnedAlbums] = useState([])

  const { user } = useContext(UserContext)

  useEffect(() => {
    setMyAlbums(feedData.filter((album) => album.userId === user.userId ? album : null))
    setPinnedAlbums(feedData.filter((album) => album.pinnedBy.includes(user.userId) ? album : null))
  }, [feedData])

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
      { viewing === 'my albums' ? <MyAlbums myAlbums={myAlbums} pinnedAlbums={pinnedAlbums} /> : null}
      { viewing === 'explore' ? <ExploreAlbums feedData={feedData} /> : null}
    </section>
  )
}

Albums.propTypes = {
  feedData: PropTypes.array
}
