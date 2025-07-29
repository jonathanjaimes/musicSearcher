export interface DeletePlaylistUseCase {
  deletePlaylist(id: string): Promise<void>;
}
