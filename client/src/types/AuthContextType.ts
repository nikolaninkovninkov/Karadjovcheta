import { AxiosError } from 'axios';
import LoginData from './LoginData';
import RegisterData from './RegisterData';
import User from './User';

export default interface AuthContextType {
  user: User | undefined;
  login: (loginData: LoginData) => Promise<void>;
  logout: () => void;
  register: (registerData: RegisterData) => Promise<void>;
  error: AxiosError | undefined;
}
