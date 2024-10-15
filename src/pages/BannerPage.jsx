import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import {  Button, Card, Flex, Input, Modal, Space, Form, message } from 'antd'
const { Meta } = Card;
import axios from 'axios';
import Api from '../api';
import { urls } from '../constants/urls';

function BannerPage() {
  const [banner, setBanner] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm()
  const [isEdit, setIsEdit]=useState(null)
  const getBanners = async() =>{
    try {
      const respons = await axios.get("https://5709cdd829da4f5e.mokky.dev/banners")
      setBanner(respons.data)
    } catch (error) {
      console.log(error);
      
    }
  }
  
  function handleClose (){
    setOpen(false)
    setIsEdit(null)
    form.resetFields()

}
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    form.submit()
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEdit =(item)=>{
    showModal()
    setIsEdit(item)
    form.setFieldsValue(item)
  }

  const onFinish =(values)=>{
    
    Api.post(urls.banners.post, values).then(res =>{
      message.success("Banner Muvoffaqiyatli Qo'shildi")
      handleClose()
      getBanners()
    form.resetFields()
    })
    console.log(values);
    
  }

 

  useEffect(()=>{
    getBanners()
  },[])
  return (
    <>
    <Space direction={'vertical'} style={{width: '100%'}} size={'large'}>

    <Flex align='center' justify='space-between'>
      <h1>Banner</h1>
      <Button onClick={showModal}>+Banner Qo'shish</Button>
    </Flex>
    {
      banner.map((item)=>{
        return(
          <Card
          key={item.id}
          style={{
            width: '100%',
            padding: 50,
            fontSize: '14px',
            color:'black'
          }}
          cover={
            <img
            alt={item.title}
            src={item.image}
            />
          }
          actions={[
            <DeleteOutlined   key='delete'/>,
            <EditOutlined onClick={()=> handleEdit(item)}  key="edit" />
          ]}
  >
    <Meta
      title={item.position} 
      description={item.id}
      />
  </Card>
        )
      })
    }

  <Modal title="Banner Qo'shish" okText="Qo'shish" cancelText="Bekor Qilish" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <Form layout='vertical' onFinish={onFinish}  form={form} name="basic">

    <Form.Item
      label="Sarlavha"
      name="position"
      rules={[
        {
          required: true,
          message: 'Iltimos, sarlavha qo\`ying!',
        },
      ]}
    >
      <Input type='text' />
    </Form.Item>

    <Form.Item
      label="Rasm uchun Havola"
      name="image"
      rules={[
        {
          required: true,
          message: 'Iltimos, Rasm uchun havola kiriting!',
        },
      ]}
    >
      <Input type='url' />
    </Form.Item>
  </Form>
      </Modal>
          
    </Space>

    
    </>
  )
}

export default BannerPage