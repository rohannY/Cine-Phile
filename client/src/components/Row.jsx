import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
    createSearchParams,
    Link,
    useNavigate,
    useSearchParams,
  } from "react-router-dom";

const Row = ({ rowId, title, fetchURL,genre}) => {
  const [movies, setMovies] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(fetchURL)
      .then((response) => {
        const moviesData = response.data.data;
       if (genre) {
          setMovies(moviesData.filter(movie => movie.genres.includes(genre)));
        } else {
          setMovies(moviesData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [fetchURL]);

  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const [like, setLike] = useState(false);

  const handleClick = (id) => {
    navigate({
      pathname: "/movie",
      search: createSearchParams({
        id: id,
      }).toString(),
    });
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          className="left-0 bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
          onClick={slideLeft}
        />
        <div
          id={"slider" + rowId}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies && movies.length > 0 ? (
            movies.map((item) => (
              <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block relative p-2 cursor-pointer"  onClick={() => handleClick(item._id)}>
                <img
                  className="w-full h-auto block"
                  src={`http://localhost:7000/${item?.poster}`}
                  alt={item?.title}
                />
                <div className="absolute top-0 left-0 w-full h-full opacity-0 hover:bg-black/80  hover:opacity-100 text-white">
                  <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                    {item?.title}
                  </p>
                  <p>
                    {like ? (
                      <FaHeart className="absolute top-4 left-4 text-gray-300" />
                    ) : (
                      <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
                    )}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No movies found.</p>
          )}
          
        </div>
        <MdChevronRight
          className="right-0 bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
          onClick={slideRight}
        />
      </div>
    </>
  );
};

export default Row;
