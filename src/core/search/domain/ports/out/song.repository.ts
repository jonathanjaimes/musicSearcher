import type { Song } from "../../models/song";

export interface SongRepository {
  searchSongs(query: string): Promise<Song[]>;
}
