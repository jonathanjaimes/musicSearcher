import React from "react";
import "./Navigation.scss";

type ViewType = "search" | "playlists";

interface NavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onViewChange,
}) => {
  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="nav-brand">
          <h1 className="app-title">Buscador de canciones</h1>
        </div>

        <div className="nav-menu">
          <button
            className={`nav-button ${currentView === "search" ? "active" : ""}`}
            onClick={() => onViewChange("search")}
          >
            Buscar Música
          </button>
          <button
            className={`nav-button ${
              currentView === "playlists" ? "active" : ""
            }`}
            onClick={() => onViewChange("playlists")}
          >
            Mis Listas
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
