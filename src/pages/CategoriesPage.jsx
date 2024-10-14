import { Avatar, Button, Flex, List, Space } from 'antd'
import React, { useEffect, useState } from 'react'

function CategoriesPage() {

    const [categories, setCategories] = useState([])

    function getCategories(){
        fetch('https://5709cdd829da4f5e.mokky.dev/categories')
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((err) => console.log(err, 'Error'))
    }

    useEffect(()=> {
        getCategories()
    }, [])

  return (
    <>
    
    <Space direction={'vertical'} style={{width: '100%'} } size={'large'}>
        <Flex align='center' justify='space-between'>
            <h1>Kategoriyalar Ro'yxati</h1>
            <Button>+ Kategoriya Qo'shish</Button>
        </Flex>

        <List
          dataSource={categories}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={!!item.image.length ? <Avatar src={item.image} /> : null }
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
        
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>  

    </>
  )
}

export default CategoriesPage