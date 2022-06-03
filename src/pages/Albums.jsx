import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import MyAlbums from '../components/MyAlbums'
import ExploreAlbums from '../components/ExploreAlbums'
import { fetchAlbums } from '../firebase'

export default function Albums ({ myAlbums }) {
  // const [albumData, setAlbumData] = useState({})

  const [exploreFeedData, setExploreFeedData] = useState([])

  const { id } = useParams()

  useEffect(() => {
    fetchAlbums(setExploreFeedData)
  }, [])

  if (id === 'myalbums') {
    return (
    <section>
      <div className="page-heading-wrapper">
        <h1 className="page-heading">Albums</h1>
      </div>
      <div className="view-btn-wrapper">
        <a className="view-btn" href="/albums/myalbums">
          <h2 className="view-btn-text">My Albums</h2>
        </a>
        <a className="view-btn" href="/albums/explore">
          <h2 className="view-btn-text">Explore Albums</h2>
        </a>
      </div>
      <MyAlbums myAlbums={myAlbums}/>
    </section>
    )
  }
  if (id === 'explore') {
    return (
      <section>
        <div className="page-heading-wrapper">
          <h1 className="page-heading">Albums</h1>
        </div>
        <div className="view-btn-wrapper">
          <a className="view-btn" href="/albums/myalbums">
            <h2 className="view-btn-text">My Albums</h2>
          </a>
          <a className="view-btn" href="/albums/explore">
            <h2 className="view-btn-text">Explore Albums</h2>
          </a>
        </div>
        <ExploreAlbums feedData={exploreFeedData}/>
      </section>
    )
  }
}

Albums.propTypes = {
  myAlbums: PropTypes.array
}
