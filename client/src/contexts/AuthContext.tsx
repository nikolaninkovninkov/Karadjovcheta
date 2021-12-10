import { AxiosError } from 'axios';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as usersApi from '../api/users';
import Loader from '../components/layout/Loader';
import useLocalStorage from '../hooks/useLocalStorage';
import AuthContextType from '../types/contexts/AuthContextType';
import LoginData from '../types/requests/LoginData';
import RegisterData from '../types/requests/RegisterData';
import User from '../types/responses/User';
const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useLocalStorage('auth-token', '');
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<AxiosError>();
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setError(undefined);
  }, [location.pathname]);
  useEffect(() => {
    if (!token) {
      return setLoadingInitial(false);
    }
    usersApi
      .getUser(token)
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
    setLoading(true);
    const response = await usersApi
      .login(loginData)
      .catch((err) => setError(err));
    setToken(typeof response?.data == 'string' ? response.data : '');
    setLoading(false);
  }
  async function register(registerData: RegisterData) {
    setLoading(true);
    const response = await usersApi
      .register(registerData)
      .catch((error) => setError(error));
    setToken(response?.data ?? '');
    setLoading(false);
  }
  function logout() {
    setToken('');
    setUser(undefined);
  }
  return (
    <AuthContext.Provider
      value={{
        login,
        user,
        logout,
        register,
        error,
        token,
        loading,
      }}>
      {!loadingInitial ? children : <Loader />}
    </AuthContext.Provider>
  );
}
export default AuthContext;
