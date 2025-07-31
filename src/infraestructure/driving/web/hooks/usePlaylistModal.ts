import { useState } from "react";
import type { Song } from "../../../../core/search/domain/models/song";

interface UsePlaylistModalReturn {
  isModalOpen: boolean;
  selectedSong: Song | null;
  openModal: (song: Song) => void;
  closeModal: () => void;
}

export const usePlaylistModal = (): UsePlaylistModalReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const openModal = (song: Song) => {
    setSelectedSong(song);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSong(null);
  };

  return {
    isModalOpen,
    selectedSong,
    openModal,
    closeModal,
  };
};
