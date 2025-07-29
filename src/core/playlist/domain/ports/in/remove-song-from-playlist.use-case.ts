import type { Playlist } from "../../models/playlist";

export interface RemoveSongFromPlaylistUseCase {
  removeSongFromPlaylist(playlistId: string, songId: string): Promise<Playlist>;
}
