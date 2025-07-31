import { useState, useCallback, useEffect } from "react";
import type { Playlist } from "../../../../core/playlist/domain/models/playlist";
import type { Song } from "../../../../core/search/domain/models/song";
import { PlaylistService } from "../../../../core/playlist/application/playlist.service";
import { FirebasePlaylistRepository } from "../../../driven/firebase/firebase-playlist.repository";
import { FirebaseClient } from "../../../driven/firebase/firebase.client";

const firebaseClient = new FirebaseClient();
const playlistRepository = new FirebasePlaylistRepository(firebaseClient);
const playlistService = new PlaylistService(playlistRepository);

export const usePlaylist = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const userPlaylists = await playlistService.getMyPlaylist();
      setPlaylists(userPlaylists);
    } catch (error: any) {
      console.error("Error loading playlists:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPlaylist = useCallback(async (name: string): Promise<void> => {
    if (!name.trim()) {
      throw new Error("El nombre de la playlist no puede estar vacío");
    }

    setError(null);

    try {
      const newPlaylist = await playlistService.createPlaylist(name.trim());
      setPlaylists((prev) => [...prev, newPlaylist]);
    } catch (error: any) {
      console.error("Error creating playlist:", error);
    }
  }, []);

  const addSongToPlaylist = useCallback(
    async (playlistId: string, song: Song): Promise<void> => {
      if (!playlistId || !song) {
        throw new Error("ID de playlist y canción son requeridos");
      }

      setError(null);

      try {
        const updatedPlaylist = await playlistService.addSongToPlaylist(
          playlistId,
          song
        );

        setPlaylists((prev) =>
          prev.map((playlist) =>
            playlist.id === playlistId ? updatedPlaylist : playlist
          )
        );
      } catch (error: any) {
        console.error("Error adding song to playlist:", error);
      }
    },
    []
  );

  const removeSongFromPlaylist = useCallback(
    async (playlistId: string, songId: string): Promise<void> => {
      if (!playlistId || !songId) {
        throw new Error("ID de playlist y canción son requeridos");
      }

      setError(null);

      try {
        const updatedPlaylist = await playlistService.removeSongFromPlaylist(
          playlistId,
          songId
        );

        setPlaylists((prev) =>
          prev.map((playlist) =>
            playlist.id === playlistId ? updatedPlaylist : playlist
          )
        );
      } catch (error: any) {
        console.error("Error removing song from playlist:", error);
      }
    },
    []
  );

  const getPlaylistById = useCallback(
    (id: string): Playlist | undefined => {
      return playlists.find((playlist) => playlist.id === id);
    },
    [playlists]
  );

  const deletePlaylist = useCallback(
    async (playlistId: string): Promise<void> => {
      if (!playlistId) {
        throw new Error("ID de playlist es requerido");
      }

      setError(null);

      try {
        await playlistService.deletePlaylist(playlistId);

        setPlaylists((prev) =>
          prev.filter((playlist) => playlist.id !== playlistId)
        );
      } catch (error: any) {
        console.error("Error deleting playlist:", error);
      }
    },
    []
  );

  return {
    playlists,
    loading,
    error,
    loadPlaylists,
    createPlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    getPlaylistById,
    deletePlaylist,
  };
};
