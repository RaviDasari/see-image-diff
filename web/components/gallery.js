import React, { useState, useEffect, useMemo, useCallback } from 'react'
import ImageViewer from './imageViewer'
import axios from 'axios'
import _ from 'lodash'
import { scrollItemIntoView } from '../utils'
import { useSelectedImage } from '../hooks/useSelectedImage'
import {
  EuiLoadingSpinner,
  EuiFlexGroup,
  EuiText,
  EuiTextAlign,
  EuiProgress
} from '@elastic/eui'

import { NavBar } from './navbar'
import { navTabs, filterItems } from './utils'
import { Thumbnail } from './thumbnail'

export function useWindowWidth (minWidth = 0) {
    const [width, setWidth] = useState(window.innerWidth > minWidth ? window.innerWidth : minWidth)
    useEffect(() => {
      window.onresize = () => {
        setWidth(window.innerWidth > minWidth ? window.innerWidth : minWidth)
      }
    }, [])
    return width
  }

export default function ImageGallery () {
  const [list, setList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [tab, setTab] = useState('Diff')
  const [searchTerms, onSearch] = useState([])
//   const windowWidth = useWindowWidth(500);

  useEffect(() => {
    axios.get('report.json').then((data) => {
      setIsLoading(false)
      if (_.isString(data.data)) {
        console.error(data)
      } else {
        setList(_.sortBy(data.data, d => _.toLower(d.file)))
      }
    }, (e) => {
      console.log(e)
    })
  }, [])

  const filterList = useMemo(() => filterItems(list, tab, searchTerms), [list, tab, searchTerms])
  const [currentSelected, isPreview, setSelected, setPreview] = useSelectedImage(filterList.length)

  const onSelect = (file) => {
    const index = _.findIndex(filterList, { file })
    setSelected(index)
    setPreview(true)
  }

  const selectedItem = filterList[currentSelected] || {}

  useEffect(() => {
    scrollItemIntoView(`thumbnail-${currentSelected}`)
  }, [currentSelected])

  const tabs = useMemo(() => {
    return navTabs.map(tab => ({
      ...tab,
      count: filterItems(list, tab.name).length
    }))
  }, [list])

  const closePreview = useCallback(() => {
    setPreview(false)
  })

  if (isLoading) {
    return (
      <div className="gallery-container">
        <EuiProgress size="xs" color="accent" position="absolute" />
        <EuiLoadingSpinner size="l" />
      </div>
    )
  }
  return (
    <div className="gallery-container">
      <NavBar 
        title={`SeeImageDiff (${filterList.length})`}
        onFilter={onSearch}
        list={filterList}
        tabs={tabs}
        onClick={setTab}
        selected={tab}/>
      <div>
        <EuiFlexGroup
            className="thumbnail-container"
            gutterSize="l"
            style={{
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
            }}>
          {!isPreview &&
                        filterList.map((data, index) => {
                          return (
                            <Thumbnail
                              isSelected={index === currentSelected}
                              key={index}
                              index={index}
                              data={data}
                              onSelect={onSelect}/>
                          )
                        })}
          {!isPreview && filterList.length === 0 &&
                        <div className="no-data-container">
                          <EuiText>
                            <EuiTextAlign textAlign="center">
                              <p>No Data available</p>
                            </EuiTextAlign>
                          </EuiText>
                        </div>
          }
        </EuiFlexGroup>
      </div>
      {isPreview &&
            <ImageViewer {...selectedItem} index={currentSelected} total={filterList.length} closeModal={closePreview}/>
      }
    </div>
  )
}
