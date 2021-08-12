import React, { createContext, ReactNode } from 'react';
import AuthContextType from '../types/AuthContextType';
const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider value={{} as AuthContextType}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
