import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    setUserData({
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    });

    console.log(userData);

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };

  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img className="w-20 mb- 10" src={logo} alt="Rydora" />

          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h3 className="text-lg w-1/2  font-medium mb-2">
              What's your name
            </h3>
            <div className="flex gap-4 mb-5">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <input
                required
                className="bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>

            <h3 className="text-lg font-medium mb-2 ">What's your email?</h3>
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

            <h3 className="text-lg font-medium mb-2 ">Enter your Password</h3>
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
              Create a New User-Account
            </button>
          </form>
          <p className="text-center">
            Already have an User-Account?{" "}
            <Link to="/user-login" className="text-blue-700">
              {" "}
              Login as an User
            </Link>{" "}
          </p>
        </div>

        <div>
          <p className="text-[10px] leading-tight">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
