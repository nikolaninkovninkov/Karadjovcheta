import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import AuthContextType from '../types/AuthContextType';
import LoginData from '../types/LoginData';
import RegisterData from '../types/RegisterData';
import TokenData from '../types/TokenData';
const AuthContext = createContext<any>({});
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useLocalStorage('auth-token', '');
  const [user, setUser] = useState<TokenData>();
  const [error, setError] = useState<AxiosError>();
  const [loadingInitial, setLoadingInitial] = useState(true);
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
      })
      .finally(() => {
        setLoadingInitial(false);
      });
  }, [token]);
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
      value={{ login, user, logout, register, error } as AuthContextType}
    >
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
