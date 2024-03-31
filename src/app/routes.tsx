import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/SignIn";
import { Movies } from "../pages/Movies";
import { AddMovie } from "../pages/AddMovie";
import { SingleMovie } from "../pages/SingleMovie";
// import { Login } from "../pages/SignIn";
// import { SignUp } from "../pages/SignUp";
// import { Dashboard } from "../pages/Dashboard";

export function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/add-movie" element={<AddMovie />} />
      <Route path="/movie/:id" element={<SingleMovie />} />
    </Routes>
  );
}
