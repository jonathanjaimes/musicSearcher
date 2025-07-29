import type { Song } from "../../../search/domain/models/song";

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
}
