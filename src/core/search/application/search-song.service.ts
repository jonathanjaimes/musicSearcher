import type { Song } from "../domain/models/song";
import type { SearchSongUseCase } from "../domain/ports/in/search-song.use-case";
import type { SongRepository } from "../domain/ports/out/song.repository";

export class SearchSongService implements SearchSongUseCase {
  private readonly songRepository: SongRepository;

  constructor(songRepository: SongRepository) {
    this.songRepository = songRepository;
  }

  search(query: string): Promise<Song[]> {
    return this.songRepository.searchSongs(query);
  }
}
