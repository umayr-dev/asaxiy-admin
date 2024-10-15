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
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDelete, setIsDelete] = useState(null)
  const getBanners = async() =>{
    try {
      const respons = await axios.get("https://5709cdd829da4f5e.mokky.dev/banners")
      setBanner(respons.data)
    } catch (error) {
      console.log(error);
      
    }
  }
  

  const showModal = () => {
    setIsModalOpen(true);
    setIsEdit(null)
  };
  const handleOk = () => {
    setIsModalOpen(false);
    form.submit()
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEdit(null)
    form.resetFields()
  };

  const handleEdit =(item)=>{
    showModal()
    setIsEdit(item)
    form.setFieldsValue(item)
  }

  const handleDeleteOpen = (item)=>{
    setDeleteModal(true)
    setIsDelete(item)
}

function handleDeleteClose(){
    setDeleteModal(false)
    setIsDelete(null)
}

function handleDeleteOk(){
    Api.delete(urls.banners.delete(isDelete.id)).then(res => {
        if(res.status === 200 || res.status ===201){
            handleDeleteClose()
            getBanners()
            message.success("Banner muvaffaqiyatli o'chirildi")
        }
    })
}

  const onFinish =(values)=>{
    
    let obj = {...values, image: values.image ? values.image : ''}
        if( isEdit === null ){
            Api.post(urls.banners.post, obj).then(res => {
                if(res.data.id){
                    message.success("kategoriya muvaffaqiyatli qo'shildi!")
                    handleCancel()
                    getCategories()
                }
            })
        }else{
            Api.patch(urls.banners.patch(isEdit.id), obj).then(res => {
                if(res.data.id){
                    message.success("kategoriya muvaffaqiyatli yangilandi!")
                    handleCancel()
                    getCategories()
                }
            }).catch(err => console.log(err, 'categoriya edit'))
        }
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
            <DeleteOutlined onClick={()=>handleDeleteOpen(item)}  key='delete'/>,
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

  <Modal title={`Kategoriya ${isEdit!== null ? 'yangilash' : "qo'shish"}`} okText={isEdit!== null ? 'yangilash' : "qo'shish"} cancelText="Bekor qilish" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
      <Modal title="Banner o'chirmoqchimisiz?" open={deleteModal} onCancel={handleDeleteClose} okText='Ha' cancelText="Yo'q" okType='danger' onOk={handleDeleteOk}>
         <p>{isDelete?.position} nomli Banner o'chirmoqchimisiz?</p>
      </Modal>
    </Space>

    
    </>
  )
}

export default BannerPage