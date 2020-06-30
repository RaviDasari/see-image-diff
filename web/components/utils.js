import _ from 'lodash'

export const navTabs = [
  { name: 'Diff', displayName: 'Diff - All', color: 'danger' },
  { name: '> 1%', color: 'danger' },
  { name: '> 5%', color: 'danger' },
  { name: 'All', color: 'secondary' },
  { name: 'Obsolete', color: '#B9A888' },
  { name: 'New', color: 'warning' }
]

export const filterItems = (list, type, searchTerms = []) => {
  return _.filter(list, (item) => {
    let isAvailable = true
    if (type === 'All') {
      isAvailable = true
    } else if (type === 'Diff') {
      isAvailable = item.hasDiff
    } else if (type === '> 1%') {
      isAvailable = item.hasDiff && item.percent > 0.01
    } else if (type === '> 5%') {
      isAvailable = item.hasDiff && item.percent > 0.05
    } else if (type === 'Obsolete') {
      isAvailable = item.hasBaseline && !item.hasCurrent
    } else if (type === 'New') {
      isAvailable = !item.hasBaseline && item.hasCurrent
    }
    if (isAvailable && searchTerms.length > 0) {
      if (_.some(searchTerms, term => item.file.toLowerCase().indexOf(term) < 0)) {
        isAvailable = false
      }
    }
    return isAvailable
  })
}
