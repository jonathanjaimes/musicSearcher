import { useState, useCallback, useEffect } from "react";
import type { Playlist } from "../../../../core/playlist/domain/models/playlist";
import { PlaylistService } from "../../../../core/playlist/application/playlist.service";
import { FirebasePlaylistRepository } from "../../../../infraestructure/driven/firebase/firebase-playlist.repository";
import { FirebaseClient } from "../../../../infraestructure/driven/firebase/firebase.client";
import type { Song } from "../../../../core/search/domain/models/song";

const firebaseClient = new FirebaseClient();
const firebasePlaylistRepository = new FirebasePlaylistRepository(
  firebaseClient
);
const playlistService = new PlaylistService(firebasePlaylistRepository);

export const usePlaylist = () => {
  const [playlist, setPlaylist] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaylist = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const allPlaylist = await playlistService.getMyPlaylist();
      setPlaylist(allPlaylist);
    } catch (error: any) {
      setError(error.message || "Error al obtener las playlist");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlaylist();
  }, [fetchPlaylist]);

  const createPlaylist = useCallback(async (name: string) => {
    try {
      const newPlaylist = await playlistService.createPlaylist(name);
      setPlaylist((prev) => [...prev, newPlaylist]);
    } catch (error: any) {
      setError(error.message || "Error al crear la playlist");
    }
  }, []);

  const addSongToPlaylist = useCallback(
    async (playlistId: string, song: Song) => {
      try {
        const updatePlaylist = await playlistService.addSongToPlaylist(
          playlistId,
          song
        );
        setPlaylist((prev) =>
          prev.map((p) => (p.id === playlistId ? updatePlaylist : p))
        );
      } catch (error: any) {
        setError(error.message || "Error al agregar la cancion a la playlist");
      }
    },
    []
  );

  const removeSongFromPlaylist = useCallback(
    async (playlistId: string, songId: string) => {
      try {
        const updatePlaylist = await playlistService.removeSongFromPlaylist(
          playlistId,
          songId
        );
        setPlaylist((prev) =>
          prev.map((p) => (p.id === playlistId ? updatePlaylist : p))
        );
      } catch (error: any) {
        setError(
          error.message || "Error al eliminar la cancion de la playlist"
        );
      }
    },
    []
  );

  const deletePlaylist = useCallback(async (id: string) => {
    try {
      await playlistService.deletePlaylist(id);
      setPlaylist((prev) => prev.filter((p) => p.id !== id));
    } catch (error: any) {
      setError(error.message || "Error al eliminar la playlist");
    }
  }, []);

  return {
    playlist,
    loading,
    error,
    fetchPlaylist,
    createPlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    deletePlaylist,
  };
};
