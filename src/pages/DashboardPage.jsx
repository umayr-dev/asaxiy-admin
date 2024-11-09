import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, Spin, message, Avatar } from 'antd';
import { UserOutlined, ShopOutlined, AppstoreAddOutlined,  TrademarkOutlined, FilterOutlined } from '@ant-design/icons'; 
import Api from '../api';
import { urls } from '../constants/urls';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    users: 0,
    products: 0,
    categories: 0,
    banners: 0,
    brands: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Dashboard ma'lumotlarini olish
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Har bir statistika uchun ma'lumotlarni olish
      const users = await Api.get(urls.users.get);
      const products = await Api.get(urls.products.get);
      const categories = await Api.get(urls.categories.get);
      const banners = await Api.get(urls.banners.get);
      const brands = await Api.get(urls.brands.get);
      const orders = await Api.get(urls.orders.get);

      // Har bir statistika uchun natijani saqlash
      setData({
        users: users.data.length,
        products: products.data.length,
        categories: categories.data.length,
        banners: banners.data.length,
        brands: brands.data.length,
        orders: orders.data.length
      });
    } catch (err) {
      message.error('Ma\'lumotlarni olishda xatolik yuz berdi!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ textAlign: 'center', color: '#4e73df' }}>Umumiy Statistika</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row  gutter={32}>
          <Col span={12}>
            <Card 
              bordered={false} 
              style={{ backgroundColor: '#f6f9fc', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}
            >
              <Statistic 
                title="Foydalanuvchilar"
                value={data.users}
                prefix={<Avatar icon={<UserOutlined />} style={{ backgroundColor: '#4e73df' }} />}
                valueStyle={{ color: '#4e73df' }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card 
              bordered={false} 
              style={{ backgroundColor: '#f6f9fc', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}
            >
              <Statistic 
                title="Mahsulotlar"
                value={data.products}
                prefix={<Avatar icon={<ShopOutlined />} style={{ backgroundColor: '#1cc88a' }} />}
                valueStyle={{ color: '#1cc88a' }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card 
              bordered={false} 
              style={{ backgroundColor: '#f6f9fc', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}
            >
              <Statistic 
                title="Kategoriyalar"
                value={data.categories}
                prefix={<Avatar icon={<AppstoreAddOutlined />} style={{ backgroundColor: '#36b9cc' }} />}
                valueStyle={{ color: '#36b9cc' }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card 
              bordered={false} 
              style={{ backgroundColor: '#f6f9fc', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}
            >
              <Statistic 
                title="Bannerlar"
                value={data.banners}
                prefix={<Avatar icon={<AppstoreAddOutlined />} style={{ backgroundColor: '#f6c23e' }} />}
                valueStyle={{ color: '#f6c23e' }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card 
              bordered={false} 
              style={{ backgroundColor: '#f6f9fc', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}
            >
              <Statistic 
                title="Brendlar"
                value={data.brands}
                prefix={<Avatar icon={<TrademarkOutlined />} style={{ backgroundColor: '#e74a3b' }} />}
                valueStyle={{ color: '#e74a3b' }}
              />
            </Card>
          </Col>

          <Col span={12}>
            <Card 
              bordered={false} 
              style={{ backgroundColor: '#f6f9fc', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}
            >
              <Statistic 
                title="Buyurtmalar"
                value={data.orders}
                prefix={<Avatar icon={<FilterOutlined />} style={{ backgroundColor: '#e74a3b' }} />}
                valueStyle={{ color: '#e74a3b' }}
              />
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default Dashboard;
