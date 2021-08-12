import { User } from 'firebase/auth';
import RegisterData from './RegisterData';

export default interface AuthContextType {
  user: User;
  register: (registerData: RegisterData) => Promise<User>;
  //   login: () => Promise<void>;
  logout: () => Promise<void>;
}
