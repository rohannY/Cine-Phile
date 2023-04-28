import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Community from './components/pages/Community'
import Admin from "./components/Admin";
import UpdateMovies from "./components/UpdateMovies";
import Watch from "./components/pages/Watch";
import Movie from "./components/pages/Movie";
import Search from "./components/pages/Search";

function App() {
  return (
    <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/community" element={<Community />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/updateMovie" element={<UpdateMovies />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/search" element={<Search />} />

        </Routes>
    </>
  );
}

export default App;
