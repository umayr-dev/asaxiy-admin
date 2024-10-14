export const  urls ={
    categories :{
        get: '/categories',
        post: '/categories',
        patch: (id)=> `/categories/${id}`,
        delete: (id)=> `/categories/${id}`
    }
}