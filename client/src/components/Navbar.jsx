import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const [user] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const token = cookies.token;

  const handleLogout = async () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center p-4 z-[100] w-full absolute font-satoshi">
      <div className="flex space-x-10">
        <Link to="/">
          <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
            NETFLIX
          </h1>
        </Link>
        {token ? (
          <div className="flex space-x-10">
            <Link to="/community" className="flex items-center">
              <h1 className="text-white text-xl  cursor-pointer">Community</h1>
            </Link>
            <Link to="/admin" className="flex items-center">
              <h1 className="text-white  text-xl cursor-pointer">Admin</h1>
            </Link>
          </div>
        ) : null}
      </div>
      {token ? (
        <div>
          <Link to="/account">
            <button className="text-white pr-4">Account</button>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="text-white pr-4">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
