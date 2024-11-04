import { Avatar, Button, Flex, Input, List, message, Modal, Space, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import Api from '../api';
import { urls } from '../constants/urls';
import { useForm } from 'antd/es/form/Form';

function BrandPage() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [brands, setBrands] = useState([]);
    const [form] = Form.useForm();
    const [isEdit, setIsEdit] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [isDelete, setIsDelete] = useState(null)

    function handleClose (){
        setOpen(false)
        setIsEdit(null)
        form.resetFields()

    }
    function handleOpen(){
        setOpen(true)
    }

    function handleEdit(item){
        handleOpen()
        setIsEdit(item)
        form.setFieldsValue(item)
        
    }

    function handleDeleteOpen(item){
        setDeleteModal(true)
        setIsDelete(item)
    }
    function handleDeleteClose(){
      setDeleteModal(false)
      setIsDelete(null)
  }
  function handleOk(){
    form.submit()
}
  function handleDeleteOk(){
    Api.delete(urls.brands.delete(isDelete.id)).then(res => {
        if(res.status === 200 || res.status ===201){
            handleDeleteClose()
            getBrands()
            message.success("Brand muvaffaqiyatli o'chirildi")
        }
    })
}
  function onFinish(values){

    let obj = {...values, image: values.image ? values.image : ''}
    if( isEdit === null ){
        Api.post(urls.brands.post, obj).then(res => {
                message.success("Brand muvaffaqiyatli qo'shildi!")
                handleClose()
                getBrands()
            }
          )
    }else{
        Api.patch(urls.brands.patch(isEdit.id), obj).then(res => {
            if(res.data.id){
                message.success("Brand muvaffaqiyatli yangilandi!")
                handleClose()
                getBrands()
            }
        }).catch(err => console.log(err, 'brand edit'))
    }
    console.log(values);
}

    function getBrands(){
        setLoading(true)
        Api.get(urls.brands.get).then( res => {
            setBrands(res.data);
        }).catch(err => console.log(err, 'Error')).finally(()=> setLoading(false))
    }

    useEffect(()=> {
        getBrands()
    }, [])

  return (
    <>
        <Space direction={'vertical'} style={{width: '100%'} } size={'large'}>
            <Flex align='center' justify='space-between'>
            <h1>Brandlar Ro'yxati</h1>
            <Button onClick={handleOpen}>+ Brand Qo'shish</Button>
        </Flex>

        <List
        loading={loading}
          dataSource={brands}
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
    <Modal title={`Brand ${isEdit!== null ? 'yangilash' : "qo'shish"}`} okText={isEdit!== null ? 'yangilash' : "qo'shish"} cancelText="Bekor qilish" open={open} onOk={handleOk} onCancel={handleClose}>


<Form layout='vertical' onFinish={onFinish} form={form}>
<Form.Item
  label="Brand nomi"
  name="name"
  rules={[
    {
      required: true,
      message: 'Iltimos, Brandga Nom Bering!',
    },
  ]}
>
  <Input />
</Form.Item>

<Form.Item
  label="Brand rasmi"
  name="image"
  rules={[
    {
      required: true,
      message: 'Iltimos, Brandni Rasmini kiriting!',
    },
  ]}
>
  <Input type='url' />
</Form.Item>




</Form>
  </Modal>
  <Modal title="Kategoriyani o'chirmoqchimisiz?" open={deleteModal} onCancel={handleDeleteClose} okText='Ha' cancelText="Yo'q" okType='danger' onOk={handleDeleteOk}>
         <p>{isDelete?.name} nomli Brandni o'chirmoqchimisiz?</p>
      </Modal>
    </>
  )
}

export default BrandPage