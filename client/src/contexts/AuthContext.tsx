import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../components/layout/Loader';
import useLocalStorage from '../hooks/useLocalStorage';
import AuthContextType from '../types/AuthContextType';
import LoginData from '../types/LoginData';
import RegisterData from '../types/RegisterData';
import TokenData from '../types/TokenData';
const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useLocalStorage('auth-token', '');
  const [user, setUser] = useState<TokenData>();
  const [error, setError] = useState<AxiosError>();
  const [loadingInitial, setLoadingInitial] = useState(true);
  const location = useLocation();
  useEffect(() => {
    setError(undefined);
  }, [location.pathname]);
  useEffect(() => {
    if (!token) {
      return setLoadingInitial(false);
    }
    const axiosRequestConfig: AxiosRequestConfig = {
      url: '/api/users/auth',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    axios(axiosRequestConfig)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        setError(error);
        setToken('');
      })
      .finally(() => {
        setLoadingInitial(false);
      });
  }, [token, setToken]);
  async function login(loginData: LoginData) {
    const axiosRequestConfig: AxiosRequestConfig = {
      url: '/api/users/login',
      method: 'POST',
      data: loginData,
    };
    const response = await axios(axiosRequestConfig).catch((err) =>
      setError(err),
    );
    setToken(typeof response?.data == 'string' ? response.data : '');
  }
  async function register(registerData: RegisterData) {
    const axiosRequestConfig: AxiosRequestConfig = {
      url: '/api/users/register',
      method: 'POST',
      data: registerData,
    };
    const response = await axios(axiosRequestConfig).catch((error) =>
      setError(error),
    );
    setToken(response?.data ?? '');
  }
  function logout() {
    setToken('');
    setUser(undefined);
  }
  return (
    <AuthContext.Provider
      value={{ login, user, logout, register, error } as AuthContextType}>
      {!loadingInitial ? children : <Loader />}
    </AuthContext.Provider>
  );
}
export default AuthContext;
