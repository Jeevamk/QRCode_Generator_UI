// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";
import ImageUpload from "./ImageUpload";
import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/constats/images"; // import your logo file

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3010/user/",
        formData
      );
      console.log(response.data.message);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error registering user:", error.response.data.error);
    }
    console.log(formData);
  };

  const token = sessionStorage.getItem("token");
  if (token) {
    return <ImageUpload />;
  }

  return (
    <>
      {isSubmitted ? (
        <Login />
      ) : (
        <div className="max-w-sm mx-auto mt-8 border border-gray-300 rounded-md p-4 shadow-xl">
          <div className="flex justify-center ">
            <img src={LOGO_URL} alt="Logo" className="h-28 w-28" />
          </div>
          <h1 className="text-3xl font-bold text-center p-2">
           Sign up
          </h1>
          <form onSubmit={handleSubmit} action="post">
            <input
              type="text"
              placeholder="Username"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none shadow-lg focus:border-black"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none shadow-lg focus:border-black"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none shadow-lg focus:border-black"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none shadow-lg focus:border-black"
            />

            {/* <button
  type="submit"
  className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-black-dark focus:outline-none focus:bg-black-dark"
>
  Signup
</button> */}
            <button
              type="submit"
              className="w-full px-4 py-2 text-white text-lg font-bold bg-gradient-to-r from-yellow-400 to-black rounded-lg hover:bg-gradient-to-r hover:from-yellow-500 hover:to-black focus:outline-none focus:bg-gradient-to-r focus:from-yellow-500 focus:to-black"
            >
              Sign up
            </button>

            <p className="text-sm font-sans text-gray-500 dark:text-gray-400 p-3 text-center">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-sm font-bold text-black dark:text-black-400"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignUp;
