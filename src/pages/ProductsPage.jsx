import { Button, Drawer, Flex, Image, Space, Table, Form, Input, Row, Col, InputNumber, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import { urls } from '../constants/urls'
import Api from '../api'

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false)

  function handleDrawerOpen(){
    setDrawerOpen(true)
  }
  function handleDrawerClose(){
    setDrawerOpen(false)
  }

  const columns = [
    {
      dataIndex: 'images',
      title: 'Mahsulot rasmi',
      render: (images)=> <Image src={images[0]} width={100} />
    },
    {
      dataIndex: 'name',
      title: 'Mahsulot nomi'
    },
    {
      dataIndex: 'price',
      title: 'Mahsulot narxi',
      render: (price) => <p>{`${price.toLocaleString()} so'm`}</p>
    },
    {
      dataIndex: 'in_stock',
      title: 'Mahsulot narxi',
      render: (price) => <p>{`${price} ta`}</p>
    },
    {
      dataIndex: 'reviews',
      title: 'Sharhlar soni',
      render: (price) => <p>{`${price} ta`}</p>
    }


  ]
  function getProducts(){
    setLoading(true)
    Api.get(urls.products.get).then((res) =>{
      setProducts(res.data)
    }).catch(err => console.log(err, "Error in get products")).finally(()=> setLoading(false))
  }

  useEffect(()=> {
    getProducts()
  }, [])

  return (
    <Space direction='vertical' size='large' style={{width:'100%'}}>
          <Flex align='center' justify='space-between'>
            <h1>Mahsulotlar Ro'yxati</h1>
          <Button onClick={handleDrawerOpen} >+ Mahsulot Qo'shish</Button>
        </Flex> 

        <Table dataSource={products} loading={loading} columns={columns}/>

        <Drawer width='600px' title="Mahsulot Yaratish" open={drawerOpen} onClose={handleDrawerClose}>
          <Form layout='vertical'>
            <Form.Item name='name' label='Mahsulot nomi' rules={[
              {
                required: true,
                message: 'Mahsulot nomini kiriting!'
              }
            ]}>
              <Input />
            </Form.Item>
            <Form.Item name='description' label='Mahsulot tavsifi' rules={[
              {
                required: true,
                message: 'Mahsulot tavsifini kiriting!'
              }
            ]}>
              <Input.TextArea  rows={6}/>
            </Form.Item>
            <Form.Item name='name' label='Mahsulot nomi' rules={[
              {
                required: true,
                message: 'Mahsulot nomini kiriting!'
              }
            ]}>
              <Input />
            </Form.Item>
            <Row gutter={[8, 0]}>

              <Col span={8}>
              <Form.Item name='price' label='Mahsulot narxi' rules={[
              {
                required: true,
                message: 'Mahsulot narxini kiriting!'
              }
            ]}>
              <InputNumber addonAfter={"so'm"}  controls={false} style={{width: '100%'}} />
            </Form.Item>
              </Col>

              <Col span={8}>
              <Form.Item name='discount_price' label='Mahsulot chegirma narxi' >
              <InputNumber addonAfter={"so'm"}  controls={false} style={{width: '100%'}} />
            </Form.Item>
              </Col> 

              <Col span={8}>
              <Form.Item name='price_per_month' label='Mahsulot oylik tolovi' >
              <InputNumber addonAfter={"so'm"} controls={false} style={{width: '100%'}} />
            </Form.Item>
              </Col>
            </Row>

            <Row gutter={[8, 0]}>

              <Col span={8}>
              <Form.Item name='isNew' label='Mahsulot yangimi'>
              <Switch checkedChildren="Ha" unCheckedChildren="Yo'q" defaultChecked />
            </Form.Item>
              </Col>

              <Col span={8}>
              <Form.Item name='isDiscount' label='Mahsulot chegirmadami' >
              <Switch checkedChildren="Ha" unCheckedChildren="Yo'q" defaultChecked />
            </Form.Item>
              </Col> 

              <Col span={8}>
              <Form.Item name='price_per_month' label='Mahsulot oylik tolovi' >
              <Switch checkedChildren="Ha" unCheckedChildren="Yo'q" defaultChecked />
            </Form.Item>
              </Col>
            </Row>

          </Form>
        </Drawer>
    </Space>
  )
}

export default ProductsPage