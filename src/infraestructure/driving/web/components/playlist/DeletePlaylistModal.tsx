import React from "react";
import type { Playlist } from "../../../../../core/playlist/domain/models/playlist";
import "./DeletePlaylistModal.scss";

interface DeletePlaylistModalProps {
  playlist: Playlist;
  onConfirm: () => void;
  onCancel: () => void;
  onOverlayClick: (e: React.MouseEvent) => void;
}

const DeletePlaylistModal: React.FC<DeletePlaylistModalProps> = ({
  playlist,
  onConfirm,
  onCancel,
  onOverlayClick,
}) => {
  return (
    <div className="modal-overlay" onClick={onOverlayClick}>
      <div className="modal-content">
        <h2>Eliminar lista de reproducción</h2>
        <p>¿Estás seguro de que quieres eliminar la lista "{playlist.name}"?</p>
        <div className="modal-actions">
          <button className="confirm-button" onClick={onConfirm}>
            Eliminar
          </button>
          <button className="cancel-button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePlaylistModal;
