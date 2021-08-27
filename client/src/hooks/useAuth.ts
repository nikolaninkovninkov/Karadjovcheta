import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import AuthContextType from '../types/contexts/AuthContextType';
function useAuth(): AuthContextType {
  return useContext(AuthContext);
}
export default useAuth;
