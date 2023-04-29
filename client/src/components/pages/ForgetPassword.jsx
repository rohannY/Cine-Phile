import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "chatToken",
    "id",
    "name",
    "email",
    "isAdmin",
  ]);
  const token = cookies.token;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7000/api/auth/forgot-password",
        JSON.stringify({ email: email }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        setResponse(true);
        setError("");
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };


  useEffect(() => {
    if (token) {
      navigate("/"); // Redirect to the home page
    }
  }, []);



  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/83e8c151-107d-4e8f-b95a-d2ba99d49bb9/f1ac72e1-5adc-4caf-bceb-e8ec775414ac/IN-en-20230213-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="/"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[450px] rounded-xl mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Forget Password</h1>
              {error ? (
                <p className="p-3 mt-10 bg-red-400 my-2">{error}</p>
              ) : null}
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  className="p-3 my-2 bg-gray-700 rounded outline-none "
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {response && (
                  <p className="p-3 mt-5 bg-green-500 my-2 font-satoshi text-center">
                    A link sent to your email
                  </p>
                )}
                <button className="bg-red-600 py-3 my-6 rounded font-bold">
                  Forget Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
