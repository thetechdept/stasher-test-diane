import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import {
  ConfigProvider,
  Layout,
} from 'antd';

import NavHeader from 'components/nav-header/NavHeader';
import themeConfig from 'theme';
import { Content } from 'antd/es/layout/layout';
import Home from 'pages/home';
import Stashpoints from 'pages/stashpoints';
import ErrorBoundary from 'components/ErrorBoundary';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/stashpoints",
    element: <Stashpoints />,
  }
])


function App() {
  return (
    <ConfigProvider theme={themeConfig}>
      <ErrorBoundary>
        <Layout>
          <NavHeader />
          <Content style={{ height: 'calc(100vh - 64px)', background: '#F3F8FE' }}>
            <RouterProvider router={router} />
          </Content>
        </Layout>
      </ErrorBoundary>
    </ConfigProvider>
  );
}

export default App;
