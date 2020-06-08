import React from 'react'
import ReactDOM from 'react-dom'
import ImageGallery from './components/gallery'
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody
} from '@elastic/eui'
import './components/icons'

// import '@elastic/eui/dist/eui_theme_amsterdam_dark.css'
// import '@elastic/eui/dist/eui_theme_dark.css'
// import '@elastic/eui/dist/eui_theme_amsterdam_light.min.css'
import '@elastic/eui/dist/eui_theme_light.min.css'
import './index.scss'

export const App = () => (
  <EuiPage>
    <EuiPageBody component="div">
      <EuiPageContent>
        <EuiPageContentBody>
          <ImageGallery />
        </EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  </EuiPage>
)

ReactDOM.render(<App />, document.getElementById('root'))

// Hot Module Replacement
if (module.hot) {
  module.hot.accept()
}
