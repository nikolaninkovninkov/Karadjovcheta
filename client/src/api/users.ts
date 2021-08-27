import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import LoginData from '../types/LoginData';
import RegisterData from '../types/RegisterData';
import User from '../types/User';
async function apiRegister(registerData: RegisterData) {
  const axiosRequestConfig: AxiosRequestConfig = {
    url: '/api/users/register',
    method: 'POST',
  };
  const response = await axios(axiosRequestConfig);
  return response as AxiosResponse<string>;
}
async function apiLogin(loginData: LoginData) {
  const axiosRequestConfig: AxiosRequestConfig = {
    url: '/api/users/login',
    method: 'POST',
    data: loginData,
  };
  const response = await axios(axiosRequestConfig);
  return response as AxiosResponse<string>;
}
async function apiGetUser(token: string) {
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
export { apiLogin, apiGetUser, apiRegister };
