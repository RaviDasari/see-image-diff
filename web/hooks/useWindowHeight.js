import { useState, useEffect } from 'react'

export function useWindowHeight (minHeight = 0) {
  const [height, setHeight] = useState(window.innerHeight > minHeight ? window.innerHeight : minHeight)
  useEffect(() => {
    window.onresize = () => {
      setHeight(window.innerHeight > minHeight ? window.innerHeight : minHeight)
    }
  }, [])
  return height
}
