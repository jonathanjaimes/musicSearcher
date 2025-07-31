import { useState, useEffect } from "react";
import type { Playlist } from "../../../../core/playlist/domain/models/playlist";

export const usePlaylistNavigation = (playlists: Playlist[]) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null
  );

  useEffect(() => {
    if (selectedPlaylist) {
      const updatedPlaylist = playlists.find(
        (p) => p.id === selectedPlaylist.id
      );
      if (updatedPlaylist) {
        setSelectedPlaylist(updatedPlaylist);
      }
    }
  }, [playlists, selectedPlaylist?.id]);

  const selectPlaylist = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
  };

  const backToList = () => {
    setSelectedPlaylist(null);
  };

  return {
    selectedPlaylist,
    selectPlaylist,
    backToList,
    setSelectedPlaylist,
  };
};
