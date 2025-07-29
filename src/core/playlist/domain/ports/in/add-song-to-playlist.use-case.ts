import type { Song } from "../../../../search/domain/models/song";
import type { Playlist } from "../../../../playlist/domain/models/playlist";

export interface AddSongToPlaylistUseCase {
  addSongToPlaylist(playlistId: string, song: Song): Promise<Playlist>;
}
