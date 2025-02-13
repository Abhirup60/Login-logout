import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Service from "./pages/Service";
import LayoutUser from "./pages/LayoutUser";
import Logout from "./pages/Logout";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<Register />} />
          <Route path='/service' element={<Service />}>
            <Route path='user' element={<LayoutUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
