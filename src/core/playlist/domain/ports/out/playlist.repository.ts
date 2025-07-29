import type { Song } from "../../../../search/domain/models/song";
import type { Playlist } from "../../../../playlist/domain/models/playlist";

export interface PlaylistRepository {
  create(name: string): Promise<Playlist>;
  findAll(): Promise<Playlist[]>;
  findById(id: string): Promise<Playlist | null>;
  addSong(playlistId: string, song: Song): Promise<Playlist>;
  removeSong(playlistId: string, songId: string): Promise<Playlist>;
  delete(id: string): Promise<void>;
}
