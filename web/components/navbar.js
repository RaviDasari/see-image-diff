import React, { useState, useMemo } from 'react'
import { Tabs } from './tabs'
import _ from 'lodash'

import {
  EuiHeader,
  EuiComboBox,
//   EuiHeaderLogo,
//   EuiSwitch
} from '@elastic/eui'

// const theme = localStorage.getItem("theme") || 'Dark';

// if (theme === "Dark") {
//     require("@elastic/eui/dist/eui_theme_dark.css");
// } else {
//     require("@elastic/eui/dist/eui_theme_light.css");
// }

// const setTheme = theme => {
//     localStorage.setItem("theme", theme);
//     window.location.reload();
// };

export function NavBar ({ title, tabs, list, onClick, selected, onFilter = _.noop }) {
    const [selectedTags, setSelectedTags] = useState([]);
    const tags = useMemo(() => {
        let tokens = [];
        _.forEach(list, ({file = ''}) => {
            tokens = _.concat(tokens, file.split(/[.\-_ ><\(\)\[\]]/));
        });
        
        tokens = _.chain(tokens)
            .compact()
            .map(_.toLower)
            .uniq()
            .sortBy()
            .map(label => ({label}))
            .value();
        return tokens;
    }, [list])

    const onChange = (data) => {
        setSelectedTags(data);
        onFilter(_.map(data, 'label'));
    };
  const sections = [
    {
      items: [<h1 key="mainHeader">&nbsp;&nbsp;{title}</h1>],
      borders: 'none'
    },
    {
      items: [
        <EuiComboBox
            style={{width: '100%', minWidth: 500}}
            placeholder="Start typing..."
            options={tags}
            selectedOptions={selectedTags}
            singleSelection={false}
            onChange={onChange}
            isClearable={true}/>,
        <Tabs key="tabs" tabs={tabs} onClick={onClick} selected={selected}/>
      ],
      borders: 'none'
    }
    // {
    //     items: [
    //         <div style={{ padding: 16 }}>
    //             <EuiSwitch
    //                 label={`${theme}`}
    //                 checked={theme === 'Light'}
    //                 onChange={e => setTheme(e.target.checked ? 'Light' : 'Dark')}
    //             />
    //         </div>,
    //     ],
    //     borders: 'none',
    // },
  ]

  return <EuiHeader position="fixed" sections={sections} />
};
