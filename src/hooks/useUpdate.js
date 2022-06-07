import { useEffect, useState } from 'react'
import { getUserData } from '../firebase'

export const useUpdate = (callback) => {
  // create recentlyUpdated state
  const [recentlyUpdated, setRecentlyUpdated] = useState(false)
  // listen for recentlyUpdated
  useEffect(() => {
    if (recentlyUpdated) {
      setRecentlyUpdated(false)
      getUserData(callback)
    }
  }, [recentlyUpdated])
  // return setRecrntlyUpdated
  return setRecentlyUpdated
}
