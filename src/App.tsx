import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./infraestructure/driving/web/views/SearchPage";
import MyPlaylistPage from "./infraestructure/driving/web/views/MyPlaylistPage";
import MainApp from "./infraestructure/driving/web/views/MainApp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/my-playlist" element={<MyPlaylistPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
