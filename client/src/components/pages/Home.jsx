import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import requests from "../../Requests";
import Main from "../Main";
import Row from "../Row";

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const token = cookies.token;
  const navigate = useNavigate();
  useEffect(() => {
    if (token === "undefined") {
      removeCookie(token);
      navigate("/login"); // Redirect to the home page
    }
  }, [token]);

  return (
    <>
      <Main />
      <div className="pb-10">
      <Row rowId="1" title="All Movies" fetchURL={requests.requestMovies} />
      <Row rowId="2" title="Action Movies" genre="Action" fetchURL={requests.requestMovies} />
      <Row rowId="3" title="Drama Movies" genre="Drama" fetchURL={requests.requestMovies} />
      </div>
    </>
  );
};

export default Home;
