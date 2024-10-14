import { Avatar, Button, Flex, Form, Input, List, message, Modal, Space } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useEffect, useState } from 'react'
import Api from '../api'
import {urls} from '../constants/urls'


function CategoriesPage() {

    const [categories, setCategories] = useState([])
    const [open, setOpen] = useState(false)
    const [form] = useForm()

    function handleClose (){
        setOpen(false)
        form.resetFields()
    }
    
    function handleOpen(){
        setOpen(true)
    }

    function handleOk(){
        form.submit()
    }

    function onFinish(values){

        let obj = {...values, image: values.image ? values.image : ''}

        Api.post(urls.categories.post, obj).then(res => {
            if(res.data.id){
                message.success("kategoriya muvaffaqiyatli qo'shildi!")
                handleClose()
                getCategories()
            }
        })
        console.log(values);
    }
    function getCategories(){
        Api.get(urls.categories.get).then( res => {
            setCategories(res.data);
        }).catch(err => console.log(err, 'Error'))
    }

    useEffect(()=> {
        getCategories()
    }, [])

  return (
    <>
    
    <Space direction={'vertical'} style={{width: '100%'} } size={'large'}>
        <Flex align='center' justify='space-between'>
            <h1>Kategoriyalar Ro'yxati</h1>
            <Button onClick={handleOpen}>+ Kategoriya Qo'shish</Button>
        </Flex>

        <List
          dataSource={categories}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={!!item.image?.length ? <Avatar src={item.image} /> : null }
                title={item.name}
                
              />
                <Flex gap={12}>
                    <Button>Edit</Button>
                    <Button danger>Delete</Button>
                </Flex>
            </List.Item>
          )}
        />
    </Space>
        
       <Modal title="Kategoriya Qo'shish" okText="Qo'shish" cancelText="Bekor qilish" open={open} onOk={handleOk} onCancel={handleClose}>


    <Form layout='vertical' onFinish={onFinish} form={form}>
    <Form.Item
      label="Kategoriya nomi"
      name="name"
      rules={[
        {
          required: true,
          message: 'Iltimos, Kategoriyaga Nom Bering!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Kategoriya Rasmi"
      name="image"
    >
      <Input type='url' />
    </Form.Item>

    


  </Form>
      </Modal>  

    </>
  )
}

export default CategoriesPage