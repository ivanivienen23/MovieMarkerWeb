import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { MovieProvider } from "./context/MovieContext";


export default function App() {
return (
<BrowserRouter>
<MovieProvider>
<NavBar />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/favorites" element={<Favorites />} />
</Routes>
</MovieProvider>
</BrowserRouter>
);
}