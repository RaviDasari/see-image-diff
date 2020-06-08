import React from 'react'
import {
  EuiCard,
  EuiFlexItem
} from '@elastic/eui'

export function Thumbnail ({ index, data, onSelect, isSelected }) {
  const folder = data.hasCurrent ? 'current' : 'base'
  return (
    <EuiFlexItem className={`thumbnail-${index}`} style={{ minWidth: 200, flexGrow: 0 }}>
      <EuiCard
        textAlign="left"
        image={
          <div>
            <img
              src={`../../${folder}/thumbnails/${data.file}`}
              alt={data.file}
            />
          </div>
        }
        className={isSelected ? 'selected-card' : undefined}
        onClick={() => onSelect(data.file)}
        title={''}
        description={data.file.replace('.png', '')}
      />
    </EuiFlexItem>
  )
}
