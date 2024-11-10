import { Button, Flex, Form, Input, message, Modal, Select, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import Api from '../api';
import { urls } from '../constants/urls';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDelete, setIsDelete] = useState(null);



  
  function getProducts() {
    Api.get(urls.products.get).then((res) => {
      setProducts(res.data);
    }).catch(err => console.log(err, 'Error while fetching products'));
  }

  const columns = [
    {
      dataIndex: 'ism',
      title: 'Foydalanuvchi Ismi',
    },
    {
      dataIndex: 'familiya',
      title: 'Foydalanuvchi Familiya',
    },
    {
      title: 'Mahsulot nomi',
      dataIndex: 'products',  // 'products' ustunini yaratish
      render: (products) => (
        <div>
          {products.map((product, index) => (
            <div key={index}>{product.name}</div>
          ))}
        </div>
      ),
    },
    {
      dataIndex: 'totalSum',
      title: "Jami To'lov",
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleDeleteOpen(record)}>O'chirish</a>
          <a onClick={() => handleEdit(record)}>Yangilash</a>
        </Space>
      ),
    },
  ];

  function handleClose() {
    setOpen(false);
    setIsEdit(null);
    form.resetFields();
  }

  function handleDeleteOpen(item) {
    setDeleteModal(true);
    setIsDelete(item);
  }

  function handleDeleteClose() {
    setDeleteModal(false);
    setIsDelete(null);
  }

  function handleDeleteOk() {
    Api.delete(urls.orders.delete(isDelete.id)).then((res) => {
      if (res.status === 200 || res.status === 201) {
        handleDeleteClose();
        getOrders();
        message.success("Buyurtma ma'lumotlari muvaffaqiyatli o'chirildi");
      }
    });
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleOk() {
    form.submit();
  }

  function handleEdit(item) {
    handleOpen();
    setIsEdit(item);
    form.setFieldsValue({
      ...item,
      productName: item.productName ? item.productName : '' // Mahsulot nomini to'g'ri o'rnatish
    });
    console.log(item);
  }

  function onFinish(values) {
    let obj = { ...values, image: values.image ? values.image : '' };
    if (isEdit === null) {
      Api.post(urls.orders.get, obj).then((res) => {
        if (res.data.id) {
          message.success("Buyurtma muvaffaqiyatli qo'shildi!");
          handleClose();
          getOrders();
        }
      });
    } else {
      Api.patch(urls.orders.patch(isEdit.id), obj).then((res) => {
        if (res.data.id) {
          message.success("Buyurtma ma'lumoti muvaffaqiyatli yangilandi!");
          handleClose();
          getOrders();
        }
      }).catch(err => console.log(err, 'users edit'));
    }
  }

  function getOrders() {
    setLoading(true);
    Api.get(urls.orders.get).then((res) => {
      setOrders(res.data);
    }).catch(err => console.log(err, 'Error')).finally(() => setLoading(false));
  }
  
  useEffect(() => {
    getOrders();
    getProducts();
  }, []);

  return (
    <>
      <Space direction={'vertical'} style={{ width: '100%' }} size={'large'}>
        <Flex align="center" justify="space-between">
          <h1>Buyurtmalar Ro'yxati</h1>
          <Button onClick={handleOpen}>+ Buyurtma Qo'shish</Button>
        </Flex>

        <Table
          dataSource={orders}
          loading={loading}
          columns={columns}
          rowKey="id"
        />

      </Space>

      <Modal
        title={`Buyurtma ma'lumotini ${isEdit !== null ? 'yangilash' : 'qo\'shish'}`}
        okText={isEdit !== null ? 'Yangilash' : 'Qo\'shish'}
        cancelText="Bekor qilish"
        open={open}
        onOk={handleOk}
        onCancel={handleClose}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            label="Foydalanuvchi Ismi"
            name="ism"
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
            label="Foydalanuvchi Familiyasi"
            name="familiya"
            rules={[
              {
                required: true,
                message: 'Iltimos, Familiyangizni Kiriting!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Mahsulot nomi" name="productName" rules={[{ required: true, message: 'Iltimos, Mahsulotni tanlang!' }]}>
            <Select>
              {products.map((product) => (
                <Select.Option key={product.id} value={product.name}>{products.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

        </Form>
      </Modal>

      <Modal
        title="Buyurtmani o'chirmoqchimisiz?"
        open={deleteModal}
        onCancel={handleDeleteClose}
        okText="Ha"
        cancelText="Yo'q"
        okType="danger"
        onOk={handleDeleteOk}
      >
        <p>{isDelete?.products?.map((product) => product.name).join(', ')} nomli Buyurtmani o'chirmoqchimisiz?</p>
      </Modal>
    </>
  );
}

export default Orders;
