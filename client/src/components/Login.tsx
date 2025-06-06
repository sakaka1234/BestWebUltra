import React, { useState } from "react";
import Spline from "@splinetool/react-spline";
import { FaLock, FaUser } from "react-icons/fa";
import { MdMail } from "react-icons/md";

export const Login = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative h-[100vh] overflow-hidden" >
      {/* Spline Background */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/NiwrewVXf8EJy7hj/scene.splinecode" />
      </div>

      {/* Login/Register Form */}
      <section className="relative h-[100vh] flex flex-col items-center justify-center text-white z-10">
        <div className="h-[390px] w-96 bg-blue-600/20 backdrop-blur-sm border border-blue-600/30 px-6 my-4 overflow-hidden rounded-lg shadow-2xl">
          {/* Register Form */}
          <div
            className={`${
              open
                ? "translate-y-[25px] transition-all duration-500"
                : "translate-y-[400px] transition-all duration-500"
            }`}
          >
            <h2 className="text-3xl font-bold pb-6 text-center">Register</h2>
            <div className="flex flex-col items-center">
              <div className="w-full relative">
                <input
                  className="border border-gray-200/50 w-full rounded-full py-2 px-4 my-2 bg-transparent backdrop-blur-sm placeholder-gray-300"
                  type="text"
                  placeholder="Username"
                />
                <FaUser className="absolute top-[35%] right-3 text-gray-300" />
              </div>
              <div className="w-full relative">
                <input
                  className="border border-gray-200/50 w-full rounded-full py-2 px-4 my-2 bg-transparent backdrop-blur-sm placeholder-gray-300"
                  type="email"
                  placeholder="Email"
                />
                <MdMail className="absolute top-[35%] right-3 text-gray-300" />
              </div>
              <div className="w-full relative">
                <input
                  className="border border-gray-200/50 w-full rounded-full py-2 px-4 my-2 bg-transparent backdrop-blur-sm placeholder-gray-300"
                  type="password"
                  placeholder="Password"
                />
                <FaLock className="absolute top-[35%] right-3 text-gray-300" />
              </div>
              <button className="my-2 py-2 w-full rounded-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
                Register
              </button>
              <span className="text-sm">
                Already have an account?{" "}
                <span
                  onClick={() => setOpen(!open)}
                  className="text-blue-300 cursor-pointer hover:text-blue-200 transition-colors"
                >
                  Login
                </span>
              </span>
            </div>
          </div>

          {/* Login Form */}
          <div
            className={`${
              !open
                ? "translate-y-[-250px] transition-all duration-500"
                : "translate-y-[400px] transition-all duration-500"
            }`}
          >
            <h2 className="text-3xl font-bold pb-6 text-center">Login</h2>
            <div className="flex flex-col items-center">
              <div className="w-full relative">
                <input
                  className="border border-gray-200/50 w-full rounded-full py-2 px-4 my-2 bg-transparent backdrop-blur-sm placeholder-gray-300"
                  type="text"
                  placeholder="Username"
                />
                <FaUser className="absolute top-[35%] right-3 text-gray-300" />
              </div>
              <div className="w-full relative">
                <input
                  className="border border-gray-200/50 w-full rounded-full py-2 px-4 my-2 bg-transparent backdrop-blur-sm placeholder-gray-300"
                  type="password"
                  placeholder="Password"
                />
                <FaLock className="absolute top-[35%] right-3 text-gray-300" />
              </div>
              <button className="my-2 py-2 w-full rounded-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
                Login
              </button>
              <span className="text-sm">
                Don't have any account?{" "}
                <span
                  onClick={() => setOpen(!open)}
                  className="text-blue-300 cursor-pointer hover:text-blue-200 transition-colors"
                >
                  Register
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

