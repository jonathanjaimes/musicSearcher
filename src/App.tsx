import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./infraestructure/driving/web/views/SearchPage";
import MyPlaylistPage from "./infraestructure/driving/web/views/MyPlaylistPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/my-playlist" element={<MyPlaylistPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
