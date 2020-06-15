import React from 'react'
import {
  EuiCard
} from '@elastic/eui'
import TrackVisibility from 'react-on-screen'

export function Thumbnail ({ index, data, onSelect, isSelected, updateLayout }) {
  const folder = data.hasCurrent ? 'current' : 'base'
  return (
    <div className={`thumbnail thumbnail-${index}`}>
      <EuiCard
        textAlign="left"
        image={
          <div>
            <TrackVisibility once partialVisibility={true}>
              {({ isVisible }) => {
                if (isVisible) {
                  return (
                    <img
                      onLoad={updateLayout}
                      src={`../../${folder}/thumbnails/${data.file}`}
                      alt={data.file}/>
                  )
                } else {
                  return <div style={{ height: 270, width: 140 }} />
                }
              }}
            </TrackVisibility>
          </div>
        }
        className={isSelected ? 'selected-card' : undefined}
        onClick={() => onSelect(data.file)}
        title={''}
        description={data.file.replace('.png', '')}
      />
    </div>
  )
}
