import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../stores/auth";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setTokenInLS } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch("https://login-logout-backend-sts4.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log("register:", response);

      if (response.ok) {
        const res_data = await response.json();
        console.log("registration details: ", res_data);
        console.log(res_data.token);

        // localStorage.setItem("token:", res_data.token);

        setTokenInLS(res_data.token);

        setUser({ username: "", email: "", password: "" });
        alert("Registration complete");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <section className='mb-9'>
        <main>
          <div className='section-registration'>
            <div className='container-register grid grid-cols-2'>
              <div className='registration-image'>
                <img src='/registration.jpg' alt='' height='500' width='500' />
              </div>

              <div className='reistration-form'>
                <h1 className='text-3xl py-5'>Registration Form</h1>

                <form onSubmit={handleSubmit}>
                  <div className='mb-4'>
                    <label htmlFor='username'>Username: </label>
                    <input
                      type='text'
                      name='username'
                      id='username'
                      placeholder='Enter your username'
                      required
                      autoComplete='off'
                      className='rounded border-8'
                      value={user.username}
                      onChange={handleInput}
                    />
                  </div>

                  <div className='mb-4'>
                    <label htmlFor='email'>Email: </label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      placeholder='Enter your email'
                      required
                      autoComplete='off'
                      className='rounded border-8'
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor='password'>Password: </label>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      placeholder='Enter your password'
                      required
                      autoComplete='off'
                      className='rounded border-8'
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>

                  <br />
                  <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-700
                     text-white font-bold py-2 px-4 rounded-full'
                  >
                    Signup
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

export default Register;
