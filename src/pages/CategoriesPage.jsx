import { Avatar, Button, Flex, Form, Input, List, message, Modal, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import Api from '../api'
import {urls} from '../constants/urls'


function CategoriesPage() {

    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [isEdit, setIsEdit] =useState(null);
    const [loading, setLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [isDelete, setIsDelete] = useState(null)

    function handleClose (){
        setOpen(false)
        setIsEdit(null)
        form.resetFields()

    }

    function handleDeleteOpen(item){
        setDeleteModal(true)
        setIsDelete(item)
    }

    function handleDeleteClose(){
        setDeleteModal(false)
        setIsDelete(null)
    }

    function handleDeleteOk(){
        Api.delete(urls.categories.delete(isDelete.id)).then(res => {
            if(res.status === 200 || res.status ===201){
                handleDeleteClose()
                getCategories()
                message.success("Kategoriya muvaffaqiyatli o'chirildi")
            }
        })
    }
    
    function handleOpen(){
        setOpen(true)
    }

    function handleOk(){
        form.submit()
    }

    function handleEdit(item){
        handleOpen()
        setIsEdit(item)
        form.setFieldsValue(item)
        console.log(item);
        
    }

    function onFinish(values){

        let obj = {...values, image: values.image ? values.image : ''}
        if( isEdit === null ){
            Api.post(urls.categories.post, obj).then(res => {
                if(res.data.id){
                    message.success("kategoriya muvaffaqiyatli qo'shildi!")
                    handleClose()
                    getCategories()
                }
            })
        }else{
            Api.patch(urls.categories.patch(isEdit.id), obj).then(res => {
                if(res.data.id){
                    message.success("kategoriya muvaffaqiyatli yangilandi!")
                    handleClose()
                    getCategories()
                }
            }).catch(err => console.log(err, 'categoriya edit'))
        }
        console.log(values);
    }
    function getCategories(){
        setLoading(true)
        Api.get(urls.categories.get).then( res => {
            setCategories(res.data);
        }).catch(err => console.log(err, 'Error')).finally(()=> setLoading(false))
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
        loading={loading}
          dataSource={categories}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={!!item.image.length ? <Avatar src={item.image} /> : null }
                title={item.name}
                
              />
                <Flex gap={12}>
                    <Button onClick={() => handleEdit(item)}>Edit</Button>
                    <Button danger onClick={()=> handleDeleteOpen(item)}>Delete</Button>
                </Flex>
            </List.Item>
          )}
        />
    </Space>
        
       <Modal title={`Kategoriya ${isEdit!== null ? 'yangilash' : "qo'shish"}`} okText={isEdit!== null ? 'yangilash' : "qo'shish"} cancelText="Bekor qilish" open={open} onOk={handleOk} onCancel={handleClose}>


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

      <Modal title="Kategoriyani o'chirmoqchimisiz?" open={deleteModal} onCancel={handleDeleteClose} okText='Ha' cancelText="Yo'q" okType='danger' onOk={handleDeleteOk}>
         <p>{isDelete?.name} nomli Kategoriyani o'chirmoqchimisiz?</p>
      </Modal>

    </>
  )
}

export default CategoriesPage