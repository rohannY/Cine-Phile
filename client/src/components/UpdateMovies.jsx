import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { useSearchParams } from "react-router-dom";

const UpdateMovies = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [rating, setRating] = useState(3);
  const [title, setTitle] = useState("");
  const [castMembers, setCastMembers] = useState([]);
  const [genre, setGenre] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [posterFile, setPosterFile] = useState([]);
  const [videoFile, setVideoFile] = useState([]);
  const [videolink,setVideolink]=useState("");
  const [posterlink,setposterlink]=useState("");

  const [baseUrl]="http://localhost:7000";
  
  const [searchparams] = useSearchParams();
  const id = searchparams.get("id");

  const [status, setStatus] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(`http://localhost:7000/api/movies/${id}`);
        const data = await res.json();
        fillData(data.data);
      } catch (err) {
        console.error(err.response);
      }
    };
    fetchMovies();
  }, [id]);

 function fillData(data) { 
    setTitle(data.title);
    setGenre(data.genres);
    setCastMembers(data.cast);
    setDescription(data.overview);
    setLanguage(data.language);
    setVideolink(data.link ? data.link : data.movie);
    setKeywords(data.keywords)
    setposterlink(data.poster);
  }


  function handleRatingChange(event) {
    setRating(parseFloat(event.target.value));
  }

  const handleCastChange = (event) => {
    const castInput = event.target.value;
    const castArray = castInput.split(",").map((item) => item.trim());
    setCastMembers(castArray);
  };

  const handleGenre = (event) => {
    const genreInput = event.target.value;
    const genreArray = genreInput.split(",").map((item) => item.trim());
    console.log(genreArray);
    setGenre(genreArray);
  };

  const handleKeywords = (event) => {
    const keywords = event.target.value;
    const keywordsArray = keywords.split(",").map((item) => item.trim());
    setKeywords(keywordsArray);
  };

  const handlePosterChange = (event) => {
    setPosterFile(event.target.files[0]);
  };

  const handleVideoChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("overview", description);
    formData.append("language", language);
    formData.append("popularity", rating);
    formData.append("cast", castMembers);
    formData.append("genres", genre);
    formData.append("keywords", keywords);

    console.log(genre);

    if(posterFile.length!==0){
        formData.append("poster", posterFile);
    }
    if(videoFile!==0){
        formData.append("movie", videoFile);
    }
  

    try {
        const response = await axios.put(`http://localhost:7000/api/admin/movie/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${cookies.token}`,
          },
        });
        console.log(response.data);
        setStatus(true);
        setTimeout(()=>{
            navigate('/admin');
       }, 1000);
      } catch (error) {
        console.error(error);
      }
    }

    const handleCancel= async (event)=>{
        navigate('/admin');
    }

  return (
    <>
      <div className="flex flex-col justify-center py-10">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 mx-8 md:mx-0 shadow rounded-2xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="flex items-center space-x-5">
                <div className="block pl-2 font-semibold text-xl self-start text-white">
                  <h2 className="leading-relaxed text-2xl text-center mb-">
                    Add Movies
                  </h2>
                  <p className="text-sm text-white font-normal leading-relaxed text-center">
                    Diversifying our selection: bringing international titles
                    and critically acclaimed movies to this Platform
                  </p>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-5 text-base leading-6 space-y-4 text-white sm:text-lg sm:leading-7">
                  <div className="flex flex-col">
                    <label className="leading-loose">Movie Name</label>
                    <input
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Movie Name"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Movie Description</label>
                    <textarea
                      type="text"
                      className="px-4 py-2 h-20 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Description"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="leading-loose">Rating</label>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.1"
                      value={rating}
                      onChange={handleRatingChange}
                      className="px-4 py-2 bg-white focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-xm focus:outline-none text-gray-600"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-gray-500 text-sm">0</span>
                      <span className="text-gray-500 text-sm">
                        {rating.toFixed(1)}
                      </span>
                      <span className="text-gray-500 text-sm">5</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="leading-loose">Language</label>
                    <input
                      type="text"
                      className="px-4 py-2 rounded-lg  border focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-xm focus:outline-none text-gray-600"
                      placeholder="English"
                      onChange={(e) => setLanguage(e.target.value)}
                      value={language}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="leading-loose">Cast</label>
                    <input
                      type="text"
                      className="px-4 py-2 rounded-lg  border focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-xm focus:outline-none text-gray-600"
                      placeholder="Cast Name Comma Seperated"
                      onChange={handleCastChange}
                      value={castMembers}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Genre</label>
                    <input
                      type="text"
                      className="px-4 py-2 rounded-lg  border focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-xm focus:outline-none text-gray-600"
                      placeholder="Genre Name Comma Seperated"
                      onChange={handleGenre}
                      value={genre}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Keywords</label>
                    <input
                      type="text"
                      className="px-4 py-2 rounded-lg  border focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-xm focus:outline-none text-gray-600"
                      placeholder="Keywords Name Comma Seperated"
                      onChange={handleKeywords}
                      value={keywords}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Upload Movie</label>
                    <input
                      type="file"
                      className="px-4 py-2  border focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-xm focus:outline-none text-gray-600"
                      onChange={handleVideoChange}
                    />
                    <div className="mt-2">
                     <p className="font-inter text-xs text-gray-400 mb-2">Preview</p>
                     <video src={`http://localhost:7000/${videolink}`} controls={true}/>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="leading-loose">Upload Poster</label>
                    <input
                      type="file"
                      className="px-4 py-2  border focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-xm focus:outline-none text-gray-600"
                      onChange={handlePosterChange}
                    />
                     <div className="mt-2">
                     <p className="font-inter text-xs text-gray-400 mb-2">Preview</p>
                     <img src={`http://localhost:7000/${posterlink}`} className="h-20 w-14" />
                    </div>
                  </div>
                </div>
                { status ? <p className="text-green-600 text-center">Movie Updated Successfully</p> :null}
                <div className="pt-4 flex items-center space-x-4">
                  <button
                    className="flex justify-center items-center w-full text-white border border-white px-4 py-3 rounded-md focus:outline-none"
                    onClick={handleCancel}
                  >
                    <svg
                      className="w-6 h-6 mr-3"
                      fill="none"
                      stroke="white"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>{" "}
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateMovies;
