import React, { useState } from "react";
import {
  createSearchParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";import { useCookies } from "react-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const [user] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["token","isAdmin"]);
  const token = cookies.token;
  const admin = cookies.isAdmin;

  const[input,setInput] = useState("");

  const handleLogout = async () => {
    removeCookie("token");
    removeCookie("chatToken");
    removeCookie("id");
    removeCookie("name");
    removeCookie("email");
    removeCookie("isAdmin");
    navigate("/login");
  };

  const handleClick = () => {
    navigate({
      pathname: "/search",
      search: createSearchParams({
        search: input,
      }).toString(),
    });
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
            {admin==="true"?(
            <Link to="/admin" className="flex items-center">
              <h1 className="text-white  text-xl cursor-pointer">Admin</h1>
            </Link>
            ):null}
          </div>
        ) : null}
      </div>
      {token ? (
        <div className="flex items-center space-x-5">
          <div>
            <div className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleClick}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
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
