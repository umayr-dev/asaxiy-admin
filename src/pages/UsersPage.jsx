import { Avatar, Button, Flex, Form, Input, List, message, Modal, Space, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import Api from '../api'
import {urls} from '../constants/urls'


function UsersPage() {

    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [isEdit, setIsEdit] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [isDelete, setIsDelete] = useState(null)


    const columns = [
        {
          dataIndex: "name",
          title: "Foydalanuvchi Ismi",
        },
        {
          dataIndex: "email",
          title: "Foydalanuvchi Email",
        },
        {
          dataIndex: "parol",
          title: "Foydalanuvchi paroli",
          render: (value)=> <TextVisible  text={value}/>
        },
        // {
        //     title: 'Tahrirlash',
        //     render: (value)=> <handleEdit text={value}/>
        // }
    ]

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
        Api.delete(urls.users.delete(isDelete.id)).then(res => {
            if(res.status === 200 || res.status ===201){
                handleDeleteClose()
                getUsers()
                message.success("Foydalanuvchi ma'lumotlari muvaffaqiyatli o'chirildi")
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
            Api.post(urls.users.post, obj).then(res => {
                if(res.data.id){
                    message.success("Foydalanuvchi muvaffaqiyatli qo'shildi!")
                    handleClose()
                    getUsers()
                }
            })
        }else{
            Api.patch(urls.users.patch(isEdit.id), obj).then(res => {
                if(res.data.id){
                    message.success("Foydalanuvchi ma'lumoti muvaffaqiyatli yangilandi!")
                    handleClose()
                    getUsers()
                }
            }).catch(err => console.log(err, 'users edit'))
        }
        console.log(values);
    }
    function getUsers(){
        setLoading(true)
        Api.get(urls.users.get).then( res => {
            setUsers(res.data);
        }).catch(err => console.log(err, 'Error')).finally(()=> setLoading(false))
    }

    useEffect(()=> {
        getUsers()
    }, [])

  return (
    <>
    
    <Space direction={'vertical'} style={{width: '100%'} } size={'large'}>
        <Flex align='center' justify='space-between'>
            <h1>Foydalanuvchi Ro'yxati</h1>
            <Button onClick={handleOpen}>+ Foydalanuvchi Qo'shish</Button>
        </Flex>

        {/* <List
        loading={loading}
          dataSource={users}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                // avatar={!!item.image.length ? <Avatar src={item.image} /> : null }
                title={item.name}
                
              />
                <Flex gap={12}>
                    <Button onClick={() => handleEdit(item)}>Edit</Button>
                    <Button danger onClick={()=> handleDeleteOpen(item)}>Delete</Button>
                </Flex>
            </List.Item>
          )}
        /> */}
      <Table dataSource={users} loading={loading} columns={columns} rowKey='id'/>
      

    </Space>
        
       <Modal title={`Foydalanuvchi ma'lumotini ${isEdit!== null ? 'yangilash' : "qo'shish"}`} okText={isEdit!== null ? 'yangilash' : "qo'shish"} cancelText="Bekor qilish" open={open} onOk={handleOk} onCancel={handleClose}>


    <Form layout='vertical' onFinish={onFinish} form={form}>
    <Form.Item
      label="Foydalanuvchi Ismi"
      name="name"
      rules={[
        {
          required: true,
          message: 'Iltimos, Ismingizni Kiriting!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Foydalanuvchi E-mail manzili"
      name="email"
      rules={[
        {
          required: true,
          message: 'Iltimos, E-mailingizni Kiriting!',
        },
      ]}
    >
      <Input type='email' />
    </Form.Item>

    <Form.Item
      label="Foydalanuvchi Paroli manzili"
      name="parol"
      rules={[
        {
          required: true,
          message: 'Iltimos, Parol Kiriting!',
        },
      ]}
    >
      <Input type='email' />
    </Form.Item>
    


  </Form>
      </Modal>  

      <Modal title="Foydalanuvchini o'chirmoqchimisiz?" open={deleteModal} onCancel={handleDeleteClose} okText='Ha' cancelText="Yo'q" okType='danger' onOk={handleDeleteOk}>
         <p>{isDelete?.name} nomli Kategoriyani o'chirmoqchimisiz?</p>
      </Modal>

    </>
  )
}
const TextVisible = ({text})=>{
    const [visible, setVisible] = useState(false)
    return <Typography onClick={()=> setVisible(!visible)}>{visible ? text : '********'}</Typography>
}

export default UsersPage