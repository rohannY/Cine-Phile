import { useEffect, useState } from "react";
import {
  createSearchParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const Search = () => {
  const [searchparams] = useSearchParams();
  const search = searchparams.get("search");
  const [data, setData] = useState("");
  const [remaining, setremaining] = useState("");
  const baseUrl = "http://localhost:7000";
  const navigate = useNavigate();
  const [blank, setBlank] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      if (search.trim() === "") {
        setBlank(true);
        return;
      }
      try {
        const res = await fetch(
          `http://localhost:7000/api/movies?search=${search}`
        );
        const response = await res.json();
        const filteredMovies = response.data.filter((movie) =>
          movie.title.toLowerCase().includes(search.toLowerCase())
        );
        const remainingMovies = response.data.filter(
          (movie) => !movie.title.toLowerCase().includes(search.toLowerCase())
        );
        setData(filteredMovies);
        setremaining(remainingMovies);
      } catch (err) {
        console.error(err.response);
      }
    };
    fetchMovies();
  }, [search]);

  const handleClick = (id) => {
    navigate({
      pathname: "/movie",
      search: createSearchParams({
        id: id,
      }).toString(),
    });
  };

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const highlightedSearch = search.trim().toLowerCase();

  const highlightTitle = (title) => {
    const parts = title.split(new RegExp(`(${highlightedSearch})`, "gi"));
    return (
      <span>
        {parts.map((part, index) => (
          <span
            key={index}
            className={
              part.toLowerCase() === highlightedSearch
                ? "bg-yellow-300 px-1 rounded-sm"
                : ""
            }
          >
            {part}
          </span>
        ))}
      </span>
    );
  };

  return (
    <>
      <div className="w-full h-screen">
        <div className="w-full px-4 pt-16">
          <div className="container px-3 mx-auto 2xl:px-32 flex-col py-10 lg:py-8 gap-8 space-y-6">
            <p className="text-white border border-gray-600 px-10 py-4 text-lg font-satoshi rounded-xl">
              Search For: <span className="text-blue-400 px-5"> {search} </span>
            </p>
            {data && data.length === 0 && (
              <p className="text-center text-xl font-figtree text-gray-300 py-10 font-light">
                I'm sorry Dave, I'm afraid I can't find any movies.
              </p>
            )}{" "}
            {blank ? (
              <div>
                <p className="text-center text-xl font-satoshi text-gray-300 py-10 font-light">
                  You can't have a blank space, baby
                </p>
                <div className="flex justify-center">
                  <img src="https://shorturl.at/eqQU8" className="rounded-2xl"/>
                </div>
              </div>
            ) : null}
            {data ? (
              data.map((list) => (
                <div
                  className="border border-gray-700 rounded-xl flex cursor-pointer"
                  onClick={() => handleClick(list._id)}
                >
                  <img
                    className="w-10 my-6 mx-10"
                    src={`${baseUrl}${list.poster}`}
                  />
                  <div>
                    <p className="text-white font-satoshi px-3 mt-6 text-2xl font-semibold">
                      {highlightTitle(list.title)}
                    </p>
                    <p className="font-satoshi px-3 py-1 text-gray-400">
                      {truncateString(list.overview, 140)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <span></span>
            )}
          </div>
          <div className="container px-3 mx-auto 2xl:px-32 flex-col py-2 lg:py-2 gap-8 space-y-6">
            <p className="text-white px-2 text-2xl py-4 font-satoshi">
              Suggested
            </p>
            {data && data.length === 0 && (
              <p className="text-center text-md font-figtree text-gray-300 py-10 font-light">
                Looks like the suggestion box is empty.
              </p>
            )}{" "}
            {remaining ? (
              remaining.map((list) => (
                <div
                  className="border border-gray-700 rounded-xl flex cursor-pointer"
                  onClick={() => handleClick(list._id)}
                >
                  <img
                    className="w-10 my-6 mx-10"
                    src={`${baseUrl}${list.poster}`}
                  />
                  <div>
                    <p className="text-white font-satoshi px-3 mt-6 text-2xl font-semibold">
                      {list.title}
                    </p>
                    <p className="font-satoshi px-3 py-1 text-gray-400">
                      {truncateString(list.overview, 140)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
