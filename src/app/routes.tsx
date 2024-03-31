import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/SignIn";
import { Movies } from "../pages/Movies";
import { AddMovie } from "../pages/AddMovie";
import { SingleMovie } from "../pages/SingleMovie";

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
