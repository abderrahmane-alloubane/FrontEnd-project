import axios from 'axios'

const API_URL = 'https://fakestoreapi.com/products'

export function getAllProducts() {
  return axios.get(API_URL)
}

export function getProduct(id) {
  return axios.get(`${API_URL}/${id}`)
}
