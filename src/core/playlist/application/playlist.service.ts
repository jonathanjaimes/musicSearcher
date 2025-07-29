import type { Song } from "../../search/domain/models/song";
import type { Playlist } from "../domain/models/playlist";
import type { PlaylistRepository } from "../domain/ports/out/playlist.repository";
import type { CreatePlaylistUseCase } from "../domain/ports/in/create-playlist.use-case";
import type { GetMyPlaylistUseCase } from "../domain/ports/in/get-my-playlist.use-case";
import type { AddSongToPlaylistUseCase } from "../domain/ports/in/add-song-to-playlist.use-case";
import type { RemoveSongFromPlaylistUseCase } from "../domain/ports/in/remove-song-from-playlist.use-case";
import type { DeletePlaylistUseCase } from "../domain/ports/in/delete-playlist.use-case";

export class PlaylistService
  implements
    CreatePlaylistUseCase,
    GetMyPlaylistUseCase,
    AddSongToPlaylistUseCase,
    RemoveSongFromPlaylistUseCase,
    DeletePlaylistUseCase
{
  private readonly playlistRepository: PlaylistRepository;

  constructor(playlistRepository: PlaylistRepository) {
    this.playlistRepository = playlistRepository;
  }

  createPlaylist(name: string): Promise<Playlist> {
    return this.playlistRepository.create(name);
  }

  getMyPlaylist(): Promise<Playlist[]> {
    return this.playlistRepository.findAll();
  }

  addSongToPlaylist(playlistId: string, song: Song): Promise<Playlist> {
    return this.playlistRepository.addSong(playlistId, song);
  }

  removeSongFromPlaylist(
    playlistId: string,
    songId: string
  ): Promise<Playlist> {
    return this.playlistRepository.removeSong(playlistId, songId);
  }

  deletePlaylist(id: string): Promise<void> {
    return this.playlistRepository.delete(id);
  }
}
