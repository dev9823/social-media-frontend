import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo4.png";
import { getJwt, userLogin } from "../service/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const userLoginMutation = userLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await userLoginMutation.mutateAsync({ username, password });
      navigate("/home");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.detail, { autoClose: false });
    }
  };

  return (
    <div className='absolute bg-[#020212] h-screen top-0 w-full'>
      <ToastContainer />
      <div className=' flex flex-col  bg-[#00343a] rounded-lg py-4 w-full h-screen sm:w-[25rem]  space-y-10 sm:h-[33rem] shadow-[#1c1c37] shadow-2xl pt-32 sm:pt-10 mx-auto sm:mt-20'>
        <img
          className='w-48 mx-auto h-8 sm:w-60 sm:h-10 object-cover mix-blend-screen'
          src={logo}
          alt=''
        />

        <form
          onSubmit={handleSubmit}
          className='flex flex-col space-y-7 w-60 mx-auto'>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className=' px-3 py-2 rounded-md bg-gray-100 placeholder:text-[#514f4f] placeholder:text-xl outline-sky-500 outline-1'
            autoFocus
            placeholder='Username'
            type='username'
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=' px-3 py-2 rounded-md bg-gray-100 placeholder:text-[#454343] placeholder:text-xl outline-sky-500 outline-1'
            placeholder='Password'
            type='password'
          />
          <button className='bg-[#ac0808d3] text-gray-300 py-2 w-24 mx-auto rounded-lg'>
            {userLoginMutation.isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
        <div className='mx-auto text-gray-300'>
          <p>
            Don't have an account?
            <span className='text-lg text-gray-950 hover:text-sky-500 px-1'>
              <Link to='/sign-up'>Register</Link>
            </span>
          </p>
          <p className='mt-2 border-b border-gray-400 w-fit hover:text-sky-500'>
            Forget Password
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
