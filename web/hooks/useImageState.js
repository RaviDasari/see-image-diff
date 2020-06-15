import { useState, useEffect } from 'react'
import _ from 'lodash'

const KEYS = {
  LEFT: 37,
  // UP: 38,
  RIGHT: 39,
  // DOWN: 40,
  ESC: 27
}

export function useImageState (state, closeModal) {
  const [currentImgState, setImageState] = useState(state)
  const downHandler = (event) => {
    const { keyCode } = event
    if (KEYS.LEFT === keyCode) {
      setImageState(currentImgState === 0 ? 0 : currentImgState - 1)
    } else if (KEYS.RIGHT === keyCode) {
      setImageState(currentImgState === 2 ? 2 : currentImgState + 1)
    } else if (KEYS.ESC === keyCode) {
      closeModal()
    }
    if (_.includes(_.map(KEYS), keyCode)) {
      // event.preventDefault();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    return () => { // Remove event listeners on cleanup
      window.removeEventListener('keydown', downHandler)
    }
  })

  const moveUp = () => { downHandler({ keyCode: KEYS.LEFT }) }
  const moveDown = () => { downHandler({ keyCode: KEYS.LEFT }) }
  const moveLeft = () => { downHandler({ keyCode: KEYS.LEFT }) }
  const moveRight = () => { downHandler({ keyCode: KEYS.RIGHT }) }

  return [currentImgState, moveUp, moveDown, moveLeft, moveRight]
}
