import { Space, Typography, Layout, theme } from 'antd'

import { ReactComponent as Logo } from 'assets/logo.svg'

const { Text } = Typography
const { Header } = Layout

const NavHeader = () => {
  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken();
  return (
    <>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          background: colorBgContainer,
        }}
      >
        <Space direction="horizontal" size={8} align="center">
          <Logo />
          <Text style={
            {
              color: colorPrimary,
              fontWeight: 500,
              fontSize: '20px',
            }
          }>
            Stasher
          </Text>
        </Space>
      </Header>
    </>
  );
};

export default NavHeader;
