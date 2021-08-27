import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import LoginData from '../types/LoginData';
import User from '../types/User';
async function login(loginData: LoginData) {
  const axiosRequestConfig: AxiosRequestConfig = {
    url: '/api/users/login',
    method: 'POST',
    data: loginData,
  };
  const response = await axios(axiosRequestConfig);
  return response as AxiosResponse<string>;
}
async function get(token: string) {
  const axiosRequestConfig: AxiosRequestConfig = {
    url: '/api/users/auth',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const response = await axios(axiosRequestConfig);
  return response as AxiosResponse<User>;
}
export { login, get };
