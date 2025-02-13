import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../stores/auth";

const Navbar = () => {
  const { isLoggedin } = useAuth();

  return (
    <div>
      <section className='navbar-section'>
        <ul className='flex flex-row justify-center items-center gap-14 mt-3 cursor-pointer '>
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/service"}>Service</NavLink>
          {isLoggedin ? (
            <NavLink to={"/logout"}>Logout</NavLink>
          ) : (
            <>
              <NavLink to={"/register"}>Register</NavLink>
              <NavLink to={"/login"}>Login</NavLink>
            </>
          )}
        </ul>
      </section>
    </div>
  );
};

export default Navbar;
