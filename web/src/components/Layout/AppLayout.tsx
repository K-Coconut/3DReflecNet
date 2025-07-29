import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, DatabaseOutlined, GlobalOutlined, ScanOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';

const { Sider, Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);

  const menuItems: MenuProps['items'] = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: '/environments',
      icon: <GlobalOutlined />,
      label: <Link to="/environments">Environment Maps</Link>,
    },
    {
      key: '/instances',
      icon: <DatabaseOutlined />,
      label: <Link to="/instances">Instances</Link>,
    },
    {
      key: '/lidars',
      icon: <ScanOutlined />,
      label: <Link to="/lidars">LiDAR Scans</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        theme="dark" 
        width={250}
        collapsedWidth={0}
        collapsed={collapsed}
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
        style={{ 
          background: '#001529',
          borderRight: '1px solid #141414',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
          transition: 'all 0.2s',
        }}
      >
        <div style={{ 
          padding: '20px 24px',
          color: '#fff',
          fontSize: '20px',
          fontWeight: 'bold',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          3DReflectNet
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          style={{ marginTop: '16px', borderRight: 0 }}
          items={menuItems}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 0 : 250, transition: 'margin-left 0.2s' }}>
        <Content style={{ background: '#f0f2f5' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;