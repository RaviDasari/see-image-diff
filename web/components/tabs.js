import React, { useMemo } from 'react'
import {
  EuiTabs,
  EuiTab,
  EuiBadge
} from '@elastic/eui'

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
    <EuiTabs size="l">
      {renderTabs.map((tab, index) => {
        return (
          <EuiTab
            color={tab.color}
            onClick={() => onClick(tab.name)}
            isSelected={tab.name === selected}
            disabled={tab.disabled}
            key={tab.name}>
            {tab.name}{tab.hideIcon ? undefined
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
