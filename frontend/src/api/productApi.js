import axios from "axios";
import { BASE_URL } from "../constants";

const API_URL = `${BASE_URL}/api/products`;


export const fetchProducts = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

export const fetchSingleProduct = async (id) => {

  const response = await axios.get(
    `${BASE_URL}/api/products/${id}`
  );

  return response.data;
};