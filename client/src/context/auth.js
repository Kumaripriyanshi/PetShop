import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  axios.defaults.headers.common["auth"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth-token");
    if (data) {
      const parseData = JSON.parse(data);
      // console.log(parseData.user, parseData.token)
    //   setAuth((prev)=>(prev.token= parseData.token,prev.user=parseData.user));
      setAuth({
      
        user: parseData.user,
        token: parseData.token,
      });
    }

    console.log("user = ",auth);

    //eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
