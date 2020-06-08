import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import {
  EuiCard,
  EuiBadge,
  EuiSpacer,
  EuiProgress
} from '@elastic/eui'

const ImagePathByState = {
  0: '../../base',
  1: '../../diff',
  2: '../../current'
}

const ImageTypes = {
  0: 'Baseline',
  1: 'Diff',
  2: 'Current'
}

const Tags = {
  0: <EuiBadge color="secondary">Baseline</EuiBadge>,
  1: <EuiBadge color="danger">Diff</EuiBadge>,
  2: <EuiBadge color="primary">Current</EuiBadge>
}

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

  return [currentImgState, setImageState]
}

export function useWindowHeight (minHeight = 0) {
  const [height, setHeight] = useState(window.innerHeight > minHeight ? window.innerHeight : minHeight)
  useEffect(() => {
    window.onresize = () => {
      setHeight(window.innerHeight > minHeight ? window.innerHeight : minHeight)
    }
  }, [])
  return height
}

export default function ImageViewer ({ file = '', percent = 0, hasBaseline, hasDiff, hasCurrent, closeModal, index = 0, total = 0 }) {
  const [currentImgState] = useImageState(1, closeModal)
  let previewUnavailable = false
  if ((ImageTypes[currentImgState] === 'Baseline' && !hasBaseline) ||
        (ImageTypes[currentImgState] === 'Diff' && !hasDiff) ||
        (ImageTypes[currentImgState] === 'Current' && !hasCurrent)) {
    previewUnavailable = true
  }

  const windowHeight = useWindowHeight(1000)
  const name = file.replace('.png', '')

  return (
    <div>
      <div>
        <h2 className="inline-block" style={{minWidth: 50, textAlign: 'center'}}>{index + 1}/{total}</h2>
        <EuiProgress value={percent * 100} max={100} className="inline-block" style={{width: 100, marginLeft: 5, marginRight: 20}} color="danger" size="l" />
        <h2 className="inline-block" title={`${ImageTypes[currentImgState]}: ${name}`}>{Tags[currentImgState]} {name}</h2>
      </div>
      <div className="actions"></div>
      {!previewUnavailable &&
            <img
              className="img-preview"
              style={{ maxHeight: windowHeight - 150 }}
              src={`${ImagePathByState[currentImgState]}/${file}`} />}
      {previewUnavailable &&
            <div className="no-preview">No Diff available!</div>
      }
    </div>
  )
}
