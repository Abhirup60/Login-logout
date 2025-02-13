import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <ul className='flex flex-row justify-center items-center gap-14 mt-3 cursor-pointer border-t-4 '>
        <NavLink to={"/service/user"}>User</NavLink>
        <NavLink to={"/"}>Home</NavLink>
      </ul>
      <Outlet/>
    </div>
  )
}

export default Layout
