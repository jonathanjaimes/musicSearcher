import type { Song } from "../../../core/search/domain/models/song";
import type { SongRepository } from "../../../core/search/domain/ports/out/song.repository";
import { SpotifyClient } from "./spotify.client";

export class SpotifySongRepository implements SongRepository {
  private readonly spotifyClient: SpotifyClient;

  constructor(spotifyClient: SpotifyClient) {
    this.spotifyClient = spotifyClient;
  }

  async searchSongs(query: string): Promise<Song[]> {
    const spotifyTracks = await this.spotifyClient.searchTracks(query);

    const songs: Song[] = spotifyTracks.items.map((track: any) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((artist: any) => artist.name).join(", "),
      album: track.album.name,
      imageUrl: track.album.images[0].url,
    }));

    return songs;
  }
}
