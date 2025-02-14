import { createContext, useContext, useEffect, useState } from "react";

// context creation
export const AuthContext = createContext();

// provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [allusers, setAllusers] = useState([]);

  // set the token in LS
  const setTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  const isLoggedin = !!token;
  console.log("isLoggedin:", isLoggedin);

// -------------------------- user authentication --------------------------//

  // user authentication check
  const authenticateUser = async () => {
    try {
      const response = await fetch("https://login-logout-backend-sts4.onrender.com/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(response);
      if (response.ok) {
        const res_data = await response.json();
        // console.log("auth-jsx userData :", res_data.userData);
        setUser(res_data.userData);
        // console.log("setUser is: ", res_data.userData)
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

// -------------------------- user authentication --------------------------//

// -------------------------- get all the users on service page ------------//
const getAllUserData = async()=>{

  try {
    const response = await fetch("https://login-logout-backend-sts4.onrender.com/api/auth/all-users",{
      method:"GET",
    })
    console.log(response);
    if(response.ok){
      const res = await response.json();
      // console.log("all users data : ",res.msg);
      setAllusers(res.msg);
    }
  } catch (error) {
    console.error(error);
  }
}
useEffect(()=>{
  getAllUserData();
},[isLoggedin]);
// -------------------------- get all the users on service page ------------//


  // logout functialities
  const logoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  return <AuthContext.Provider value={{ setTokenInLS, logoutUser, isLoggedin, user, allusers }}>{children}</AuthContext.Provider>;
};

// consumer
export const useAuth = () => {
  const AuthContextValue = useContext(AuthContext);

  if (!AuthContext) {
    throw new Error("useauth used outside of the provider");
  }

  return AuthContextValue;
};
