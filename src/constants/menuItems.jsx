import {
    TableOutlined,
    BarChartOutlined,
    ShoppingOutlined,
    CodepenOutlined
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
      
]