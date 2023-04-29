import { useState } from "react";
import change from "../assets/update.svg";
import x from "../assets/x.svg";
import axios from "axios";
import AddMovies from "./AddMovies";
import { useCookies } from "react-cookie";
import { createSearchParams,Link, useNavigate } from 'react-router-dom'

const Admin = () => {
  const [update, setUpdate] = useState(true);
  const [movies, setMovies] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  
  const [movie, setMovie] = useState(); //for getting movie data from server
  const baseUrl = "http://localhost:7000";

  const navigate = useNavigate();

  const showAdd = (event) => {
    setUpdate(true);
    setMovies(false);
  };

  const showMovies = (event) => {
    setUpdate(false);
    setMovies(true);
    fetchMovies();
  };

  async function fetchMovies() {
    try {
      const response = await axios.get("http://localhost:7000/api/movies");
      setMovie(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async (key) => {
    const token = cookies.token;
    const url = 'http://localhost:7000/api/admin/movie';
  
    try {
      const response = await axios.delete(`${url}/${key}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      window.location.reload();
    } catch (error) {
      if(error.response.status==401){
        alert("Unauthorized");
      }
      console.log("Error:" + error.response.data.error)
    }
  }

  
  const handleUpdate = async (key) => {    
    navigate({
      pathname: "/admin/updateMovie",
      search: createSearchParams({
        id: key,
      }).toString(),
    });
    
  }

  return (
    <>
      <>
        <div>
          <div className="flex overflow-hidden pt-16 px-10 font-satoshi">
            <aside
              id="sidebar"
              className="fixed ml-10 z-20 h-screen top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
              aria-label="Sidebar"
            >
              <div className="relative flex-1 flex flex-col min-h-0 rounded-2xl bg-[#232627] pt-0">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                  <div className="flex-1 px-3  divide-y space-y-1">
                    <ul className="space-y-5 pb-2 py-6">
                      <li>
                        <a
                          href="#"
                          className="text-base bg-[#181A1B] text-white font-normal rounded-xl flex items-center py-4 px-7 hover:border hover:border-gray-300  group"
                          onClick={showMovies}
                        >
                          <svg
                            className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                            fill="white"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="ml-3 flex-1 whitespace-nowrap">
                            Movies
                          </span>
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="text-base bg-[#181A1B] text-white font-normal rounded-xl flex items-center py-4 px-7 hover:border hover:border-gray-300  group"
                          onClick={showAdd}
                        >
                          <svg
                            className="h-7"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                          <span className="ml-3 flex-1 whitespace-nowrap">
                            Add Movies
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </aside>

            <div
              id="main-content"
              className="w-full rounded-xl relative mx-10 overflow-y-auto lg:ml-64"
            >
              <main>
                {movies ? (
                  <div className="bg-[#232627] rounded-xl mx-10 h-full py-5 px-10">
                    <p className="mb-10 text-2xl font-satoshi font-semibold text-white pt-6">
                      Movies
                    </p>
                    <div className="space-y-8">
                      {/* this is an individual card */}

                      {movie?.map((list) => (
                        <div className="flex justify-between" key={list._id}>
                          <div className="flex space-x-6 items-center">
                            <img
                              className="h-14 w-14 border border-gray-700 rounded-xl"
                              src={`${baseUrl}${list.poster}`}
                            />
                            <p className="text-lg font-figtree text-gray-300 font-semibold">
                              {list.title}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <img
                              src={change}
                              className="h-10 w-10 border p-2 rounded-lg bg-white cursor-pointer hover:bg-red-200"
                              onClick={() => handleUpdate(list._id)}
                            />
                            <img
                              src={x}
                              className="h-10 w-10 border p-2 rounded-lg bg-white cursor-pointer hover:bg-red-200"
                              onClick={() => handleDelete(list._id)}
                              />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {update ? <AddMovies /> : null}
              </main>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Admin;
