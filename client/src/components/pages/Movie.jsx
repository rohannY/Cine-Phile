import play from "../../assets/play.svg";
import { useEffect, useState } from "react";
import {
  createSearchParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useCookies } from "react-cookie";

const Movie = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const token = cookies.token;
  const [searchparams] = useSearchParams();
  const id = searchparams.get("id");
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const baseUrl = "http://localhost:7000";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(`http://localhost:7000/api/movies/${id}`);
        const data = await res.json();
        setData(data.data);
      } catch (err) {
        console.error(err.response);
      }
    };
    if (!token) {
      navigate("/login"); // Redirect to the home page
    }

    fetchMovies();
  }, [id]);


  const handleWatch = () => {
    navigate({
      pathname: "/watch",
      search: createSearchParams({
        id: id,
      }).toString(),
    });
  };

  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src={`${baseUrl}${data.poster}`}
          alt="/"
        />
        <div className="bg-black/80 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-col py-10 lg:py-8 gap-8">
            <div className="xl:col-span-1 w-full xl:order-none order-last h-header bg-dry border border-gray-800 rounded-lg overflow-hidden">
              <img
                src={`${baseUrl}${data.poster}`}
                alt={data.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-2 md:grid grid-cols-5 gap-4 items-center text-white font-satoshi">
              <div className="col-span-5 flex flex-col">
                <h1 className="xl:text-4xl capitalize font-satoshi text-2xl font-bold mb-6">
                  {data.title}
                </h1>
                <div className="flex items-center gap-4 font-medium text-gray-300 mb-6">
                  {data.genres?.map((genre) => (
                    <div className="flex-col bg-subMain text-sm px-2 py-1 border border-red-400 rounded-2xl">
                      {genre}
                    </div>
                  ))}
                </div>
                <p className="text-text text-sm leading-7 text-gray-100 mb-6 pr-52">
                  {data.overview}
                </p>
                <div className="flex items-center gap-4 font-medium text-gray-300 mb-6">
                  {data.keywords?.map((words) => (
                    <div className="flex-col bg-subMain text-xs px-2 py-1 border border-gray-600">
                      {words}
                    </div>
                  ))}
                </div>
                <p className="text-white text-2xl mb-6">Cast</p>
                <div className="mb-6 gap-x-2 gap-y-3 flex flex-wrap">
                  {data.cast?.map((cast) => (
                    <p className="px-5 py-2 border border-blue-400 font-medium font-figtree rounded-md">
                      {cast}
                    </p>
                  ))}
                </div>
                <button
                  onClick={handleWatch}
                  className="border border-gray-600 px-9 py-4 space-x-3 flex w-1/5 items-center rounded-full hover:bg-red-700"
                >
                  <p className="text-xl font-figtree">Watch</p>
                  <img className="w-5 h-5" src={play} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movie;
