import type { Song } from "../../models/song";

export interface SearchSongUseCase {
  search(query: string): Promise<Song[]>;
}
