import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo4.png";
import { register } from "../service/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerMutation = register();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await registerMutation.mutateAsync({ email, username, password });
      navigate("/login");
    } catch (error) {
      console.log("Error.....................");
      let errorMessage = "";
      if (error.response.data.email)
        errorMessage += error.response.data.email.join(" ");
      if (error.response.data.username)
        errorMessage += " " + error.response.data.username.join(" ");
      if (error.response.data.password)
        errorMessage += " " + error.response.data.password.join(" ");
      toast.error(errorMessage, { autoClose: false });
    }
  };

  return (
    <div className='absolute bg-[#020212] h-screen top-0 w-full'>
      <ToastContainer />
      <div className=' flex flex-col  bg-[#00343a] rounded-lg py-4 w-full h-screen max-w-[25rem]  space-y-10  sm:h-[35rem] shadow-[#1c1c37] shadow-2xl pt-32 sm:pt-10 mx-auto sm:mt-10'>
        <img
          className='w-48 mx-auto h-8 sm:w-60 sm:h-10 object-cover mix-blend-screen'
          src={logo}
          alt=''
        />

        <form
          onSubmit={handleSubmit}
          className='flex flex-col space-y-7 w-60 mx-auto'>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=' px-3 py-2 rounded-md bg-gray-100 placeholder:text-[#514f4f] placeholder:text-xl outline-sky-500 outline-1'
            autoFocus
            placeholder='Email'
            type='email'
          />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className=' px-3 py-2 rounded-md bg-gray-100 placeholder:text-[#514f4f] placeholder:text-xl outline-sky-500 outline-1'
            placeholder='Username'
            type='text'
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=' px-3 py-2 rounded-md bg-gray-100 placeholder:text-[#514f4f] placeholder:text-xl outline-sky-500 outline-1'
            placeholder='Password'
            type='password'
          />
          <button className='bg-[#ac0808d3] text-gray-300 py-2 w-24 outline-none mx-auto rounded-lg'>
            {registerMutation.isLoading ? "Loading..." : "Submit"}
          </button>
          <p className='mx-auto text-gray-300'>
            Already have an account?{" "}
            <span className='text-lg text-[#000] font-semibold px-1'>
              <Link to='/login'>Login</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
