import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../stores/auth";
import { toast } from 'react-toastify';

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setTokenInLS } = useAuth();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch("https://login-logout-backend-sts4.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const res_data = await response.json();
        console.log("login details: ", res_data);

        // set the token
        // localStorage.setItem("token:", res_data.token);

        setTokenInLS(res_data.token);

        toast.success("Login successful");
        setUser({ email: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <section>
        <main>
          <div className='login-section'>
            <div className='container-login grid grid-cols-2'>
              <div className='login-image'>
                <img src='/registration.jpg' height='500px' width='500px' alt='' />
              </div>

              <div className='login-form'>
                <h1 className='text-3xl py-5'>Login Form</h1>
                <form onSubmit={handleSubmit}>
                  <div className='mb-4'>
                    <label htmlFor='email'>Email: </label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      placeholder='Enter your email'
                      className='rounded border-8'
                      required
                      autoComplete='off'
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div className='mb-4'>
                    <label htmlFor='password'>Password: </label>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      placeholder='password'
                      className='rounded border-8'
                      required
                      autoComplete='off'
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>

                  <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
                     rounded-full'
                  >
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default Login;
