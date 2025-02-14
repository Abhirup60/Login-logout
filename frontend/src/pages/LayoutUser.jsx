import React from "react";
import { useAuth } from "../stores/auth";

const LayoutUser = () => {
  const allusers = useAuth();
  const { isloggedin } = useAuth();
  console.log('from service page:',isloggedin)
  // console.log(allusers);
  // console.log(allusers.allusers)

  return (
    <div>
      <h2>Fetch Users Here and Perform CRUD Operations</h2>
      {isloggedin ? (
        allusers?.allusers?.length > 0 ? (
          allusers.allusers.map((curElem, index) => (
            <div key={index}>
              <p><strong>Email:</strong> {curElem.email}</p>
              <p><strong>Username:</strong> {curElem.username}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )
      ) : (
        <p>Please log in to view user data....</p>
      )}
    </div>
  );
};

export default LayoutUser;
