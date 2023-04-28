import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../Requests";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
const Main = () => {
  const [movies, setmovies] = useState();
  function setindex() {
    setIndex(Math.floor(Math.random() * 40) + 1);
  }

  const [index, setIndex] = useState("0");

  useEffect(() => {
    axios
      .get(requests.requestMovies)
      .then((response) => {
        setmovies(response.data.data);
        setindex();
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate({
      pathname: "/movie",
      search: createSearchParams({
        id: id,
      }).toString(),
    });
  };

  return (
    <div className="w-full h-[550px] text-white">
      {movies && movies.length > 0 ? (
        <div className="w-full h-full">
          <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
          <img
            className="w-full h-full object-cover"
            src={`http://localhost:7000/${movies[index]?.poster}`}
            alt={movies[index]?.title}
          />
          <div className="absolute w-full top-[20%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-bold">
              {movies[index]?.title}
            </h1>
            <div className="my-4">
              <button
                onClick={() => handleClick(movies[index]._id)}
                key=""
                className="border bg-gray-300 text-black border-gray-300 py-2 px-5"
              >
                Play
              </button>
              <button className="border text-white ml-4 border-gray-300 py-2 px-5">
                Watch Later
              </button>
            </div>

            <p className="text-gray-400 text-sm flex my-3">
              Genre:
              {movies[index].genres?.map((genre) => (
                <p className="text-gray-400 text-sm">{genre},</p>
              ))}
            </p>
            <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
              {truncateString(movies[index].overview, 200)}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Main;
