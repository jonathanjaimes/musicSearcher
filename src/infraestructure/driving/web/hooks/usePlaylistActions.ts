import type { Song } from "../../../../core/search/domain/models/song";

interface UsePlaylistActionsReturn {
  handleCreatePlaylist: (name: string) => Promise<void>;
  handleAddSongToPlaylist: (playlistId: string, song: Song) => Promise<void>;
}

export const usePlaylistActions = (
  createPlaylist: (name: string) => Promise<void>,
  addSongToPlaylist: (playlistId: string, song: Song) => Promise<void>
): UsePlaylistActionsReturn => {
  const handleCreatePlaylist = async (name: string) => {
    await createPlaylist(name);
  };

  const handleAddSongToPlaylist = async (playlistId: string, song: Song) => {
    await addSongToPlaylist(playlistId, song);
  };

  return {
    handleCreatePlaylist,
    handleAddSongToPlaylist,
  };
};
