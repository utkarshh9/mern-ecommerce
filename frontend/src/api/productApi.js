import axios from "axios";

const API_URL = "http://localhost:5000/api/products";


export const fetchProducts = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

export const fetchSingleProduct = async (id) => {

  const response = await axios.get(
    `http://localhost:5000/api/products/${id}`
  );

  return response.data;
};