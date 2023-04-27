import { useEffect, useState } from "react";
import {
    createSearchParams,
    Link,
    useNavigate,
    useSearchParams,
  } from "react-router-dom";
  import { useCookies } from "react-cookie";

const Watch = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const token = cookies.token;
  const [searchparams] = useSearchParams();
  const id = searchparams.get("id");
  const [data, setData] = useState("");
  const baseUrl = "http://localhost:7000";
  const navigate = useNavigate();

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
    fetchMovies();

    if (!token) {
        navigate("/login"); // Redirect to the home page
    }
  }, [id]);

  return (
    <>
      <div className="w-full h-screen">
        <div className="w-full px-4 pt-16">
          <div className="container px-3 mx-auto 2xl:px-32 flex-col py-10 lg:py-8 gap-8 space-y-6">
            <p className="text-white border border-gray-600 px-10 py-6 text-2xl font-satoshi rounded-xl">
              {data.title}
            </p>
            <video
              className="py-10 px-10 border border-gray-600 rounded-xl w-full"
              src={`${baseUrl}${data.link}`}
              controls={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Watch;
