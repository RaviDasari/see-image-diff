import React from 'react'
import { createRoot } from 'react-dom/client'
import ImageGallery from './components/gallery'
import {
  EuiPage,
  EuiPageBody,
  EuiPageSection
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
      <EuiPageSection>
        <ImageGallery />
      </EuiPageSection>
    </EuiPageBody>
  </EuiPage>
)

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)

// Hot Module Replacement
if (module.hot) {
  module.hot.accept()
}
