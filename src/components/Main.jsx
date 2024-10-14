import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { menuItems } from '../constants/menuItems';
import { Link, Route, Routes } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import CategoriesPage from '../pages/CategoriesPage';
import ProductsPage from '../pages/ProductsPage';
import BannerPage from '../pages/BannerPage';
const { Header, Sider, Content } = Layout;
const Main = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuItems.map(item => ({...item, label: <Link to={item.path}>{item.label}</Link> }))}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>

            <Route path='/' element={<DashboardPage />}/>
            <Route path='/categories' element={<CategoriesPage />}/>
            <Route path='/product' element={<ProductsPage />}/>
            <Route path='/banner' element={<BannerPage />}/>

          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Main;