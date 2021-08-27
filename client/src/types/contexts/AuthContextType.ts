import { AxiosError } from 'axios';
import LoginData from '../requests/LoginData';
import RegisterData from '../requests/RegisterData';
import User from '../responses/User';

export default interface AuthContextType {
  user: User | undefined;
  login: (loginData: LoginData) => Promise<void>;
  logout: () => void;
  register: (registerData: RegisterData) => Promise<void>;
  error: AxiosError | undefined;
}
