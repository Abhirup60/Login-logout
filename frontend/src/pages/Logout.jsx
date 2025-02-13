import React, { useEffect } from 'react'
import { Navigate } from "react-router-dom";
import { useAuth } from "../stores/auth"; 


const Logout = () => {
  const {logoutUser} = useAuth();

    useEffect(()=>{
        logoutUser();
    },[logoutUser])
  return (
    <div>
        <Navigate to={"/login"} replace/>
    </div>
  )
}

export default Logout
