import React from "react";
import logo from "../assets/logo.png";
import homeImg from "../assets/HomeImgFour.webp";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${homeImg})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
        className="h-screen pt-8 flex justify-between flex-col bg-red-400 w-full"
      >
        <img className="w-20 ml-8" src={logo} alt="Rydora" />
        <div className="bg-white py-4 px-4 pb-7">
          <h2 className="text-3xl font-bold">Get started with Rydora</h2>
          <Link
            to="/user-login"
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
