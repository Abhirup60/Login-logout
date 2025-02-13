import React from "react";
import { useAuth } from "../stores/auth";

const LayoutUser = () => {
  const allusers = useAuth();
  // console.log(allusers);
  // console.log(allusers.allusers)

  return (
    <div>
      Fetch User Here and do CURD Operation
      {allusers.allusers.map((curElem, index) => {
        return (
          <>
            <p>Email: {curElem.email}</p> 
            <p>Username: {curElem.username}</p><br />
          </>
        );
      })}
    </div>
  );
};

export default LayoutUser;
