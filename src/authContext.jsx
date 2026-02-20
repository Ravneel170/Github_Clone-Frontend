import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {

  return useContext(AuthContext);

}


export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const userId = localStorage.getItem('userId');

    if (userId) {

      setUser(userId);
    }
  }, []);

  const value = { user, setUser }

  return (

    <AuthContext.Provider value={value}>

      {children}

    </AuthContext.Provider>
    )
}

