import React, { useState } from "react";
import Layout from "../components/layouts/Layout";

const Service = () => {
  const [name, setName] = useState("Abhirup");
  const changeName = () => {
    if (name === "Abhirup") {
      setName("Anurag");
    } else {
      setName("Abhirup");
    }

  };
  return (
    <div>
      <h1 className='text-3xl'>
        <b>Welcome {name} to Service page</b>
      </h1>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 
      rounded-full ml-3 mt-2' onClick={changeName}>
        Change Name
      </button>
      <Layout />
    </div>
  );
};

export default Service;
