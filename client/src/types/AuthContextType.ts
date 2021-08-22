import { AxiosError } from 'axios';
import LoginData from './LoginData';
import RegisterData from './RegisterData';
import TokenData from './TokenData';

export default interface AuthContextType {
  user: TokenData | undefined;
  login: (loginData: LoginData) => Promise<void>;
  logout: () => void;
  register: (registerData: RegisterData) => Promise<void>;
  error: AxiosError | undefined;
}
