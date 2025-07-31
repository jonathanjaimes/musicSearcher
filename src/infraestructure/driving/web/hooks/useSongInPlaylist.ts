import { useMemo } from "react";
import type { Playlist } from "../../../../core/playlist/domain/models/playlist";
import type { Song } from "../../../../core/search/domain/models/song";

interface SongInPlaylistResult {
  isInPlaylist: boolean;
  playlistName?: string;
  playlistId?: string;
}

export const useSongInPlaylist = (
  song: Song,
  playlists: Playlist[]
): SongInPlaylistResult => {
  return useMemo(() => {
    for (const playlist of playlists) {
      if (
        playlist.songs &&
        playlist.songs.some((playlistSong) => playlistSong.id === song.id)
      ) {
        return {
          isInPlaylist: true,
          playlistName: playlist.name,
          playlistId: playlist.id,
        };
      }
    }

    return {
      isInPlaylist: false,
    };
  }, [song.id, playlists]);
};
