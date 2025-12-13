import axios from "axios";

const API_URL = "https://fakestoreapi.com/products";

export function getAllProducts() {
  return axios.get(API_URL);
}

export function getProduct(id) {
  return axios.get(`${API_URL}/${id}`);
}

export async function GetCategories() {
  let resp = await axios.get(API_URL);
  let data = resp.data;
  let CatList = new Set();

  data.forEach((element) => {
    CatList.add(element["category"]);
  });
  return CatList;
}
