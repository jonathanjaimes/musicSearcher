import React, { useState } from "react";
import SearchPage from "./SearchPage";
import MyPlaylistPage from "./MyPlaylistPage";
import Navigation from "../components/Navigation";
import "./MainApp.scss";

type ViewType = "search" | "playlists";

const MainApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>("search");

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  return (
    <div className="main-app">
      <Navigation currentView={currentView} onViewChange={handleViewChange} />

      <main className="main-content">
        {currentView === "search" && <SearchPage />}
        {currentView === "playlists" && <MyPlaylistPage />}
      </main>
    </div>
  );
};

export default MainApp;
