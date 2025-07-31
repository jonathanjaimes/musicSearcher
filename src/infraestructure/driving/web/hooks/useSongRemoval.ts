import { useState } from "react";
import type { Playlist } from "../../../../core/playlist/domain/models/playlist";

export const useSongRemoval = (
  onRemoveSong: (playlistId: string, songId: string) => Promise<void>,
  selectedPlaylist: Playlist | null
) => {
  const [removingSongId, setRemovingSongId] = useState<string | null>(null);

  const removeSong = async (playlistId: string, songId: string) => {
    setRemovingSongId(songId);

    try {
      await onRemoveSong(playlistId, songId);
    } catch (error) {
      console.error("Error removing song:", error);
    } finally {
      setRemovingSongId(null);
    }
  };

  const handleRemoveSong = (songId: string) => {
    if (selectedPlaylist) {
      removeSong(selectedPlaylist.id, songId);
    }
  };

  return {
    removingSongId,
    removeSong,
    handleRemoveSong,
  };
};
