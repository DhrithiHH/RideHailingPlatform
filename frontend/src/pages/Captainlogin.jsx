import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Captainlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    setCaptainData({
      email: email,
      password: password,
    });
    console.log(captainData);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className="w-20 mb- 10" src={logo} alt="Rydora" />

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2 ">
            What's our Captain's email?
          </h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded border px-4 py-2 w-full text-lg placeholder:text-base"
            type="email"
            placeholder="example@email.com"
          />

          <h3 className="text-lg font-medium mb-2 ">
            Enter your Password Captain
          </h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            type="password"
            placeholder="password"
          />

          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Sign in as Our Captain
          </button>
        </form>
        
        <p className="text-center">
          New here?{" "}
          <Link to="/captain-signup" className="text-blue-700">
            {" "}
            Create New Captain-Account
          </Link>{" "}
        </p>
      </div>

      <div>
        <Link
          to="/user-login"
          className="bg-[#403f3f] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};
export default Captainlogin;
