import React, { useMemo } from 'react'
import {
  EuiTabs,
  EuiTab,
  EuiBadge,
  EuiIcon
} from '@elastic/eui'
import Diff from '../assets/diff.svg'
import Obsolete from '../assets/obsolete.svg'
import All from '../assets/all.svg'
import New from '../assets/new.svg'

const Icons = {
  Diff: Diff,
  Obsolete: Obsolete,
  All: All,
  New: New
}

function GetIcon ({ type }) {
  const icon = Icons[type]
  if (icon) {
    return <EuiIcon type={icon} />
  }
  return null
}

export function Tabs ({ tabs, onClick, selected }) {
  const renderTabs = useMemo(() => {
    const t = tabs.map(tab => ({
      ...tab,
      id: tab.name,
      name: tab.name
    }))
    return t
  }, [tabs, selected])

  return (
    <EuiTabs className="nav-tabs" size="xl">
      {renderTabs.map((tab, index) => {
        return (
          <EuiTab
            color={tab.color}
            onClick={() => onClick(tab.name)}
            isSelected={tab.name === selected}
            disabled={tab.disabled}
            key={tab.name}>
            <GetIcon type={tab.name}/>
            {tab.displayName ? tab.displayName : tab.name}{tab.hideIcon ? undefined
              : <React.Fragment>
                &nbsp;&nbsp;
                <EuiBadge color={tab.color}>{tab.count}</EuiBadge>
              </React.Fragment>}
          </EuiTab>
        )
      })}
    </EuiTabs>
  )
}
