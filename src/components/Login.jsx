// // eslint-disable-next-line no-unused-vars, no-unused-vars
import { useEffect, useState } from "react";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [token, setToken] = useState(false);

  useEffect(() => {
    const userToken = sessionStorage.getItem("token");
    if (userToken) {
      setToken(true);
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3010/user/login",
        formData
      );

      const token = response.data.token;
      sessionStorage.setItem("token", token);
      setToken(true);
      console.log(response.data);
      setFormData({ email: "", password: "" });

    } catch (error) {
      console.error("Error Login user:", error.response.data.error);
    }
    console.log("formddata:", formData);
  };

  return (
    <>
      {token ? (
        <ImageUpload />
      ) : (
        <div className="max-w-sm mx-auto mt-8 border border-gray-300 rounded-md p-4 shadow-xl ">
          <h1 className="text-3xl font-bold  p-3 text-center">Welcome</h1>
          <p className="font-serif text-gray-400 text-center block mb-4">Sign in by entering the information below</p>
          <form onSubmit={handleSubmit} action="post" className="p-3">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none shadow-lg focus:border-black-500"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none shadow-lg focus:border-black-500"
            />
            {/* <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-black-dark focus:outline-none focus:bg-black-dark"
            >
              Sign In
            </button> */}
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-bold text-lg bg-gradient-to-r from-yellow-400 to-black rounded-lg hover:bg-gradient-to-r hover:from-yellow-500 hover:to-black focus:outline-none focus:bg-gradient-to-r focus:from-yellow-500 focus:to-black"
            >
              Sign In
            </button>
            <p className="text-sm font-sans text-gray-500 dark:text-gray-400 p-3 text-center">
              Don't have an account? <Link to="/SignUp" className="text-black font-bold dark:text-black-400">Sign Up</Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
