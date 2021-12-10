import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import LoginData from '../types/requests/LoginData';
import RegisterData from '../types/requests/RegisterData';
import User from '../types/responses/User';
async function register(registerData: RegisterData) {
  const axiosRequestConfig: AxiosRequestConfig = {
    url: '/api/users/register',
    method: 'POST',
    data: registerData,
  };
  const response = await axios(axiosRequestConfig);
  return response as AxiosResponse<string>;
}
async function login(loginData: LoginData) {
  const axiosRequestConfig: AxiosRequestConfig = {
    url: '/api/users/login',
    method: 'POST',
    data: loginData,
  };
  const response = await axios(axiosRequestConfig);
  return response as AxiosResponse<string>;
}
async function getUser(token: string) {
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
export { login, getUser, register };
