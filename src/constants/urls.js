export const  urls ={
    categories :{
        get: '/categories',
        post: '/categories',
        patch: (id)=> `/categories/${id}`,
        delete: (id)=> `/categories/${id}`
    },
    banners :{
        get: '/banners',
        post: '/banners',
        patch: (id)=> `/banners/${id}`,
        delete: (id)=> `/banners/${id}`
    },
    products : {
        get: '/products',
        post: '/products',
        patch: (id)=> `/products/${id}`,
        delete: (id)=> `/products/${id}`
    },
    brands : {
        get: '/brands',
        post: '/brands',
        patch: (id)=> `/brands/${id}`,
        delete: (id)=> `/brands/${id}`
    },
    users : {
        get: '/users',
        post: '/users',
        patch: (id)=> `/users/${id}`,
        delete: (id)=> `/users/${id}`
    },
    orders : {
        get: '/orders',
        post: '/orders',
        patch: (id)=> `/orders/${id}`,
        delete: (id)=> `/orders/${id}`
    }
}