import { useState, useEffect } from 'react'
import _ from 'lodash'

const KEYS = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  ESC: 27,
  ENTER: 13
}

export function useSelectedImage (count) {
  const [currentSelected, setSelected] = useState(0)
  const [isPreview, setPreview] = useState(false)

  useEffect(() => {
    const downHandler = (event) => {
      const { keyCode } = event
      if (KEYS.UP === keyCode) {
        setSelected((currentSelected - 1 + count) % count)
      } else if (KEYS.LEFT === keyCode && !isPreview) {
        setSelected((currentSelected - 1 + count) % count)
      } else if (KEYS.DOWN === keyCode) {
        setSelected((currentSelected + 1) % count)
      } else if (KEYS.RIGHT === keyCode && !isPreview) {
        setSelected((currentSelected + 1) % count)
      } else if (KEYS.ENTER === keyCode) {
        setPreview(true)
      }

      if (_.includes(_.map(KEYS), keyCode)) {
        event.preventDefault()
      }
    }
    window.addEventListener('keydown', downHandler)
    return () => { // Remove event listeners on cleanup
      window.removeEventListener('keydown', downHandler)
    }
  }, [isPreview, currentSelected, count])

  return [currentSelected, isPreview, setSelected, setPreview]
}
