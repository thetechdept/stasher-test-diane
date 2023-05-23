import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ConfigProvider, Layout } from 'antd'

import NavHeader from 'components/nav-header/NavHeader'
import themeConfig from 'theme'
import { Content } from 'antd/es/layout/layout'
import Home from 'pages/home'
import Stashpoints from 'pages/stashpoints'
import ErrorBoundary from 'components/ErrorBoundary'
import { useLoadScript } from '@react-google-maps/api'

const mapApi = {
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
  libraries: ['places'],
}
function App() {
  // @ts-ignore
  const { isLoaded } = useLoadScript({
    ...mapApi,
  })

  return (
    <ConfigProvider theme={themeConfig}>
      <ErrorBoundary>
        <Layout>
          <NavHeader />
          <Content
            style={{ height: 'calc(100vh - 64px)', background: '#F3F8FE' }}
          >
            <RouterProvider
              router={createBrowserRouter([
                {
                  path: '/',
                  element: <Home isMapLoaded={isLoaded} />,
                },
                {
                  path: '/stashpoints',
                  element: <Stashpoints isMapLoaded={isLoaded} />,
                },
              ])}
            />
          </Content>
        </Layout>
      </ErrorBoundary>
    </ConfigProvider>
  )
}

export default App
