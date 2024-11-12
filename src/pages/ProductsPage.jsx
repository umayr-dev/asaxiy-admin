import {
  Button,
  Drawer,
  Flex,
  Image,
  Space,
  Table,
  Form,
  Input,
  Row,
  Col,
  InputNumber,
  Switch,
  Select,
  Modal,
  message
} from "antd";
import React, { useEffect, useState } from "react";
import { urls } from "../constants/urls";
import Api from "../api";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const isSale = Form.useWatch("isSale", form);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [brandsLoading, setBrandsLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDelete, setIsDelete] = useState(null)
  const [isEdit, setIsEdit] =useState(null);

  function handleDrawerOpen() {
    setDrawerOpen(true);

  }
  function handleDrawerClose() {
    setDrawerOpen(false);
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

    function handleEditClick(item){
      setIsEdit(item)
      handleDrawerOpen()
      form.setFieldsValue(item)
    }

    function handleDeleteOk(){
        Api.delete(urls.products.delete(isDelete.id)).then(res => {
            if(res.status === 200 || res.status ===201){
                handleDeleteClose()
                getProducts()
                message.success("Mahsulot muvaffaqiyatli o'chirildi")
            }
        })
    }

    function onSwitchChange(id,value, type){
      console.log(value)
      Api.patch(urls.products.patch(id), {[type]: value}).then(res => {
        getProducts()
  
      }).catch((err) => console.log(err, "Error in changing products"))
    }

  const columns = [
    {
      dataIndex: "images",
      title: "Mahsulot rasmi",
      render: (images) => <Image src={images[0]} width={100} />,
    },
    {
      dataIndex: "name",
      title: "Mahsulot nomi",
    },
    {
      dataIndex: "price",
      title: "Mahsulot narxi",
      render: (price) => <p>{`${price.toLocaleString()} so'm`}</p>,
    },
    {
      dataIndex: "in_stock",
      title: "Ombordagi soni",
      render: (price) => <p>{`${price} ta`}</p>,
    },
    {
      dataIndex: "reviews",
      title: "Sharhlar soni",
      render: (price) => <p>{`${price} ta`}</p>,
    },
    {
      title: "Yangimi?",
      render: (product) =>
      <Switch
      onChange={(e)=> onSwitchChange(product.id,  e, 'isNew')}
      checkedChildren="Ha"
      unCheckedChildren="Yo'q"
      defaultChecked={product.isNew} />
    },
    {
      title: "Mashhurmi?",
      render: (product) =>
      <Switch
      onChange={(e)=> onSwitchChange(product.id,e, 'isPopular')}
      checkedChildren="Ha"
      unCheckedChildren="Yo'q"
      defaultChecked={product.isPopular} />
    },
    {
      title: '',
      render :(item)=> <Space>
        <Button onClick={()=> handleEditClick(item)}>Yangilash</Button>
        <Button danger onClick={()=> handleDeleteOpen(item)}>O'chirish</Button>
      </Space>
    },
  ];

  function getProducts() {
    setLoading(true);
    Api.get(urls.products.get)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err, "Error in get products"))
      .finally(() => setLoading(false));
  }

  

  function getCategories() {
    setCategoriesLoading(true);
    Api.get(urls.categories.get)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err, "Error in fetching categories"))
      .finally(() => setCategoriesLoading(false));
  }

  function getBrands() {
    setBrandsLoading(true);
    Api.get(urls.brands.get)
      .then((res) => setBrands(res.data))
      .catch((err) => console.log(err, "Error in fetching brand"))
      .finally(() => setBrandsLoading(false));
  }

  function handleAddClick() {
    form.submit();
  }

  function onSubmit(e) {
    setPostLoading(true)
    if (!!isEdit){
      Api.patch(urls.products.patch(isEdit.id), e).then(res =>{
        getProducts()
          handleDrawerClose()
      })
      .catch(err => console.log(err , 'Error in edit product')).finally(()=> setPostLoading(false))
    }else{
      Api.post(urls.products.post, e).then(res => {
        getProducts()
        handleDrawerClose()
      }).catch(err => console.log(err , 'Error in add product')).finally(()=> setPostLoading(false))
    }
  }

  useEffect(() => {
    getProducts();
    getCategories();
    getBrands();
  }, []);

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Flex align="center" justify="space-between">
        <h1>Mahsulotlar Ro'yxati</h1>
        <Button onClick={handleDrawerOpen}>+ Mahsulot Qo'shish</Button>
      </Flex>

      <Table dataSource={products} loading={loading} columns={columns} rowKey='id'/> 

      <Drawer
      loading={postLoading}
        maskClosable={false}
        extra={<Button loading={postLoading} onClick={handleAddClick}>{isEdit!== null ? 'Yangilash' : "Qo'shish"}</Button>}
        width="600px"
        title="Mahsulot Yaratish"
        open={drawerOpen}
        onClose={handleDrawerClose}
      >
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            name="name"
            label="Mahsulot nomi"
            rules={[
              {
                required: true,
                message: "Mahsulot nomini kiriting!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mahsulot tavsifi"
            rules={[
              {
                required: true,
                message: "Mahsulot tavsifini kiriting!",
              },
            ]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>

          <Row gutter={[8, 0]}>
            <Col span={8}>
              <Form.Item
                name="price"
                label="Mahsulot narxi"
                rules={[
                  {
                    required: true,
                    message: "Mahsulot narxini kiriting!",
                  },
                ]}
              >
                <InputNumber
                  addonAfter={"so'm"}
                  controls={false}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="months" label="Mahsulot oyi">
                <InputNumber
                  addonAfter={"oy"}
                  controls={false}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="price_per_month" label="Mahsulot oylik tolovi">
                <InputNumber
                  addonAfter={"so'm"}
                  controls={false}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[8, 0]}>
            <Col span={8}>
              <Form.Item name="isNew" label="Mahsulot yangimi">
                <Switch
                  checkedChildren="Ha"
                  unCheckedChildren="Yo'q"
                  defaultChecked={false}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="isSale" label="Mahsulot chegirmadami">
                <Switch
                  checkedChildren="Ha"
                  unCheckedChildren="Yo'q"
                  defaultChecked={false}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="isPopular" label="Mahsulot mashhurmi">
                <Switch
                  checkedChildren="Ha"
                  unCheckedChildren="Yo'q"
                  defaultChecked={false}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[8, 0]}>
            {isSale && (
              <Col span={8}>
                <Form.Item
                  name="discount_price"
                  label="Mahsulot chegirma narxi"
                >
                  <InputNumber
                    addonAfter={"so'm"}
                    controls={false}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            )}

            <Col span={8}>
              <Form.Item name="in_stock" label="Ombordagi soni">
                <InputNumber
                  addonAfter={"ta"}
                  controls={false}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="reviews" label="Sarhlar soni">
                <InputNumber
                  addonAfter={"ta"}
                  controls={false}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>

            <Form.Item rules={[
              {
                required: true,
                message: 'Kategoriyani tanlang'
              }
            ]} name="category_id" label="Mahsulot kategoriyasi">
              <Select loading={categoriesLoading} key='value' options={categories.map(({ id: value, name: label }) => ({ value, label,}))}
              />
            </Form.Item>

            <Form.Item rules={[
              {
                required: true,
                message: 'Brand tanlang'
              }
            ]} name="brand_id" label="Mahsulot Brandi">
              <Select loading={brandsLoading} key='value' options={brands.map(({ id: value, name: label }) => ({ value, label,}))}
              />
            </Form.Item>

          </Row>
          <Form.List name="images">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                    }}
                    align="center"
                  >
                    <Form.Item
                      {...restField}
                      name={[name]}
                      rules={[
                        {
                          required: true,
                          message: "Mahsulot rasmini kiriting!",
                        },
                      ]}
                    >
                      <Input type="url" style={{ flex: "1" }} />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Yana rasm qo'shish
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Drawer>
      <Modal title="Mahsulotni o'chirmoqchimisiz?" open={deleteModal} onCancel={handleDeleteClose} okText='Ha' cancelText="Yo'q" okType='danger' onOk={handleDeleteOk}>
         <p>{isDelete?.name} nomli Mahsulotni o'chirmoqchimisiz?</p>
      </Modal>
    </Space>
  );
}

export default ProductsPage;
