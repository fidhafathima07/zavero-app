import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/users`,
    userData
  );

  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axios.get(
    `${API_URL}/users?email=${encodeURIComponent(email)}`
  );

  if (response.data.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = response.data[0];

  if (user.password !== password) {
    throw new Error("Invalid email or password");
  }

  return user;
};