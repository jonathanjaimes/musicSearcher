import type { Playlist } from "../../../core/playlist/domain/models/playlist";
import type { PlaylistRepository } from "../../../core/playlist/domain/ports/out/playlist.repository";
import type { Song } from "../../../core/search/domain/models/song";
import type { FirebaseClient } from "./firebase.client";

export class FirebasePlaylistRepository implements PlaylistRepository {
  private readonly firebaseClient: FirebaseClient;

  constructor(firebaseClient: FirebaseClient) {
    this.firebaseClient = firebaseClient;
  }

  create(name: string): Promise<Playlist> {
    return this.firebaseClient.createPlaylist(name);
  }

  findAll(): Promise<Playlist[]> {
    return this.firebaseClient.getPlaylist();
  }

  findById(id: string): Promise<Playlist | null> {
    return this.firebaseClient.getPlaylistById(id);
  }

  addSong(playlistId: string, song: Song): Promise<Playlist> {
    return this.firebaseClient.addSongToPlaylist(playlistId, song);
  }

  removeSong(playlistId: string, songId: string): Promise<Playlist> {
    return this.firebaseClient.removeSongFromPlaylist(playlistId, songId);
  }

  delete(id: string): Promise<void> {
    return this.firebaseClient.deletePlaylist(id);
  }
}
