import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createOrder = async (order) => {
  const response = await axios.post(
    `${API_URL}/orders`,
    order
  );

  return response.data;
};

export const getOrders = async (userId) => {
  const response = await axios.get(
    `${API_URL}/orders?userId=${userId}`
  );

  return response.data;
};