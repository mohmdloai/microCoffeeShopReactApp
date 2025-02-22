import axios from "axios";
const baseUrl = "http://localhost:5001/products";


const getAllProducts = () => axios.get(baseUrl) //return a promise  too
const getProductById = (produtId) => axios.get(`${baseUrl}/${produtId}`)
const addNewProduct = (product) => axios.post(`${baseUrl}`, product)
const editProduct = (produtId, product) => axios.put(`${baseUrl}/${produtId}`, product)
const deleteProduct = (produtId) => axios.delete(`${baseUrl}/${produtId}`)

export { getAllProducts, getProductById, addNewProduct, editProduct, deleteProduct }

