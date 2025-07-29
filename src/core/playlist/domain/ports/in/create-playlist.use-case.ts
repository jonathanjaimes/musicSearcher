import type { Playlist } from "../../models/playlist";

export interface CreatePlaylistUseCase {
  createPlaylist(name: string): Promise<Playlist>;
}
