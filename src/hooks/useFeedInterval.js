import { useState, useEffect } from 'react'

export default function useFeedInterval () {
  // create timer state
  const [timer, setTimer] = useState(0)
  // increment that state on interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(timer + 1)
    }, 5000)
    return () => {
      clearInterval(intervalId)
    }
  })
}
