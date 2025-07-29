import { useState, useCallback, useMemo } from "react";
import type { Song } from "../../../../core/search/domain/models/song";
import { SearchSongService } from "../../../../core/search/application/search-song.service";
import { SpotifySongRepository } from "../../../../infraestructure/driven/spotify/spotify-song.repository";
import { SpotifyClient } from "../../../../infraestructure/driven/spotify/spotify.client";

const spotifyClient = new SpotifyClient();
const spotifySongRepository = new SpotifySongRepository(spotifyClient);
const searchSongService = new SearchSongService(spotifySongRepository);

export const useSearch = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = useCallback(async (query: string) => {
    if (!query) {
      setSongs([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const songs = await searchSongService.search(query);
      setSongs(songs);
    } catch (error: any) {
      setError(error.message || "Error al buscar canciones");
      setSongs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    songs,
    loading,
    error,
    performSearch,
  };
};
