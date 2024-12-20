import {
    TableOutlined,
    BarChartOutlined,
    ShoppingOutlined,
    CodepenOutlined,
    FilterOutlined,
    UserOutlined,
    TrademarkOutlined
  } from '@ant-design/icons';
export const menuItems = [
    
        {
          key: '1',
          icon: <BarChartOutlined />,
          label: 'Asosiy',
          path: '/'
        },
        {
          key: '2',
          icon: <CodepenOutlined />,
          label: 'Kategoriya',
          path: '/categories'
        },
        {
          key: '3',
          icon: <ShoppingOutlined />,
          label: 'Mahsulotlar',
          path:'/product'
        },
        {
            key: '4',
            icon: <TableOutlined />,
            label: 'Banner',
            path: '/banner'
        },
        {
          key: '5',
          icon: <TrademarkOutlined />,
          label: 'Brands',
          path: '/brand'
      },
      {
        key: '6',
        icon: <UserOutlined />,
        label: 'Foydalanuvchilar',
        path: '/users'
    },
        {
          key: '7',
          icon: <FilterOutlined />,
          label: 'Buyurtmalar',
          path: '/orders'
      }
      
]