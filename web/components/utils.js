import _ from 'lodash'

export const navTabs = [
  { name: 'All', color: 'secondary' },
  { name: 'Diff', color: 'danger', icon: 'bug' },
  { name: 'Obselete', color: 'danger', icon: 'alert' },
  { name: 'New', color: 'warning' }
]

export const filterItems = (list, type, searchTerms = []) => {
  return _.filter(list, (item) => {
    let isAvailable = true;
    if (type === 'All') {
      isAvailable = true
    } else if (type === 'Diff') {
      isAvailable = item.hasDiff
    } else if (type === 'Obselete') {
      isAvailable = item.hasBaseline && !item.hasCurrent
    } else if (type === 'New') {
      isAvailable = !item.hasBaseline && item.hasCurrent
    }
    if (isAvailable && searchTerms.length > 0) {
        if (_.some(searchTerms, term => item.file.toLowerCase().indexOf(term) < 0)) {
            isAvailable = false;
        }
    }
    return isAvailable
  })
}
