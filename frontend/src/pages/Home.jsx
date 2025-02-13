import React from "react";
import { useAuth } from "../stores/auth";

const Home = () => {
  const  user  = useAuth();
  console.log(user.user);
  return (
    <div>
      <h1 className='text-4xl'>Home page</h1>
      {
        user.user.username ? <p>Hello {user.user.username}</p> : (
          <>
             <p>username is fetching....</p>
          </>
        )
      }
    </div>
  );
};

export default Home;
