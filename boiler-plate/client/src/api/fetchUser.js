import axios from "axios";

const USER_API_URL = "/api/users"; // 기본 회원 API URL

export const userLoginAction = async (body) => {
  const response = await axios.post(`${USER_API_URL}/login`, body);
  return response.data;
};

export const userRegisterAction = async (body) => {
  const response = await axios.post(`${USER_API_URL}/register`, body);
  return response.data;
};

export const userLogoutAction = async () => {
  const response = await axios.get(`${USER_API_URL}/logout`);
  return response.data;
};

export const userAuth = async () => {
  const response = await axios.get(`${USER_API_URL}/auth`);
  console.log("응답",response)
  return response.data;
};
