import type { Playlist } from "../../models/playlist";

export interface GetMyPlaylistUseCase {
  getMyPlaylist(): Promise<Playlist[]>;
}
