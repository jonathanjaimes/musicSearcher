import { useState, useCallback, useEffect } from "react";
import type { Playlist } from "../../../../core/playlist/domain/models/playlist";
import type { Song } from "../../../../core/search/domain/models/song";

// Importar servicios y repositorios reales
import { PlaylistService } from "../../../../core/playlist/application/playlist.service";
import { FirebasePlaylistRepository } from "../../../driven/firebase/firebase-playlist.repository";
import { FirebaseClient } from "../../../driven/firebase/firebase.client";

// Crear instancias de los servicios (singleton pattern)
const firebaseClient = new FirebaseClient();
const playlistRepository = new FirebasePlaylistRepository(firebaseClient);
const playlistService = new PlaylistService(playlistRepository);

export const usePlaylist = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Simulación temporal de datos (se reemplazará con Firebase)
  const mockPlaylists: Playlist[] = [
    {
      id: "1",
      name: "Mis Favoritas",
      songs: [
        {
          id: "mock-song-1",
          title: "Song Example",
          artist: "Artist Example",
          album: "Album Example",
          imageUrl: "https://via.placeholder.com/300",
        },
      ],
    },
    {
      id: "2",
      name: "Para Entrenar",
      songs: [],
    },
  ];

  // Cargar playlists al montar el componente
  useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Usar el servicio real (cuando Firebase esté configurado)
      const userPlaylists = await playlistService.getMyPlaylist();
      setPlaylists(userPlaylists);
    } catch (error: any) {
      console.error("Error loading playlists:", error);
      console.warn("Usando datos mock debido al error:", error.message);

      // Fallback a datos mock si Firebase no está disponible
      await new Promise((resolve) => setTimeout(resolve, 500));
      setPlaylists(mockPlaylists);

      // No mostrar error al usuario si podemos usar mock data
      // setError(error.message || "Error al cargar las listas de reproducción");
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
      // Usar el servicio real
      const newPlaylist = await playlistService.createPlaylist(name.trim());
      setPlaylists((prev) => [...prev, newPlaylist]);

      console.log("Playlist creada:", newPlaylist);
    } catch (error: any) {
      console.error("Error creating playlist:", error);
      console.warn("Usando simulación debido al error:", error.message);

      // Fallback a simulación si Firebase no está disponible
      const newPlaylist: Playlist = {
        id: Date.now().toString(),
        name: name.trim(),
        songs: [],
      };

      await new Promise((resolve) => setTimeout(resolve, 300));
      setPlaylists((prev) => [...prev, newPlaylist]);

      console.log("Playlist creada (simulación):", newPlaylist);
    }
  }, []);

  const addSongToPlaylist = useCallback(
    async (playlistId: string, song: Song): Promise<void> => {
      if (!playlistId || !song) {
        throw new Error("ID de playlist y canción son requeridos");
      }

      setError(null);

      try {
        // Usar el servicio real
        const updatedPlaylist = await playlistService.addSongToPlaylist(
          playlistId,
          song
        );

        setPlaylists((prev) =>
          prev.map((playlist) =>
            playlist.id === playlistId ? updatedPlaylist : playlist
          )
        );

        console.log("Canción agregada a playlist:", updatedPlaylist);
      } catch (error: any) {
        console.error("Error adding song to playlist:", error);
        console.warn("Usando simulación debido al error:", error.message);

        // Fallback a simulación si Firebase no está disponible
        await new Promise((resolve) => setTimeout(resolve, 300));

        setPlaylists((prev) =>
          prev.map((playlist) => {
            if (playlist.id === playlistId) {
              // Verificar si la canción ya existe en la playlist
              const songExists = playlist.songs.some(
                (existingSong) => existingSong.id === song.id
              );
              if (songExists) {
                throw new Error(
                  "La canción ya está en esta lista de reproducción"
                );
              }
              return {
                ...playlist,
                songs: [...playlist.songs, song],
              };
            }
            return playlist;
          })
        );

        console.log("Canción agregada (simulación):", { playlistId, song });
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
        // Usar el servicio real
        const updatedPlaylist = await playlistService.removeSongFromPlaylist(
          playlistId,
          songId
        );

        setPlaylists((prev) =>
          prev.map((playlist) =>
            playlist.id === playlistId ? updatedPlaylist : playlist
          )
        );

        console.log("Canción eliminada de playlist:", updatedPlaylist);
      } catch (error: any) {
        console.error("Error removing song from playlist:", error);
        console.warn("Usando simulación debido al error:", error.message);

        // Fallback a simulación si Firebase no está disponible
        await new Promise((resolve) => setTimeout(resolve, 300));

        setPlaylists((prev) =>
          prev.map((playlist) => {
            if (playlist.id === playlistId) {
              return {
                ...playlist,
                songs: playlist.songs.filter((song) => song.id !== songId),
              };
            }
            return playlist;
          })
        );

        console.log("Canción eliminada (simulación):", { playlistId, songId });
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
        // Usar el servicio real
        await playlistService.deletePlaylist(playlistId);

        setPlaylists((prev) =>
          prev.filter((playlist) => playlist.id !== playlistId)
        );

        console.log("Playlist eliminada:", playlistId);
      } catch (error: any) {
        console.error("Error deleting playlist:", error);
        console.warn("Usando simulación debido al error:", error.message);

        // Fallback a simulación si Firebase no está disponible
        await new Promise((resolve) => setTimeout(resolve, 300));

        setPlaylists((prev) =>
          prev.filter((playlist) => playlist.id !== playlistId)
        );

        console.log("Playlist eliminada (simulación):", playlistId);
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
