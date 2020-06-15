import React from 'react'
import {
  EuiBadge,
  EuiProgress,
  EuiIcon
} from '@elastic/eui'
import { Modal } from './modal'
import { useImageState } from '../hooks/useImageState'
import { useWindowHeight } from '../hooks/useWindowHeight'

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

export default function ImageViewer ({ file = '', percent = 0, hasBaseline, hasDiff, hasCurrent, closeModal, index = 0, total = 0 }) {
  const [currentImgState,,, moveLeft, moveRight] = useImageState(1, closeModal)
  let previewUnavailable = false
  if ((ImageTypes[currentImgState] === 'Baseline' && !hasBaseline) ||
        (ImageTypes[currentImgState] === 'Diff' && !hasDiff) ||
        (ImageTypes[currentImgState] === 'Current' && !hasCurrent)) {
    previewUnavailable = true
  }

  const windowHeight = useWindowHeight(1000)
  const name = file.replace('.png', '')

  return (
    <Modal>
      <div id="image-viewer">
        <EuiIcon type="cross" color="white" className="icon close" onClick={closeModal}/>
        {currentImgState > 0 && <EuiIcon type="arrowLeft" color="white" className="icon left" onClick={moveLeft}/>}
        {currentImgState < 2 && <EuiIcon type="arrowRight" color="white" className="icon right" onClick={moveRight}/>}
        <div className="image-title">
          <h2 className="inline-block" title={`${ImageTypes[currentImgState]}: ${name}`}>{name}</h2>
        </div>
        <div className="actions"></div>
        <div className="image-container">
          {!previewUnavailable &&
                    <img
                      className="image-content"
                      style={{ maxHeight: windowHeight - 150 }}
                      src={`${ImagePathByState[currentImgState]}/${file}`} />}
          {previewUnavailable &&
                    <div className="image-content no-preview">No {ImageTypes[currentImgState].toLowerCase()} image available!</div>}
        </div>
        <div className="page-info">
          <h2 className="inline-block" style={{ minWidth: 50, textAlign: 'center' }}>{index + 1}/{total}</h2>
          <EuiProgress value={percent * 100} title={percent * 100} max={100} className="inline-block" style={{ width: 100, marginLeft: 5, marginRight: 20 }} color="danger" size="l" />
          <div className="inline-block tag">{Tags[currentImgState]}</div>
        </div>
      </div>
    </Modal>
  )
}
