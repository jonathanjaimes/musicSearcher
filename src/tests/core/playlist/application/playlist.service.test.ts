import { describe, it, expect, vi, beforeEach } from "vitest";
import { PlaylistService } from "../../../../core/playlist/application/playlist.service";
import type { PlaylistRepository } from "../../../../core/playlist/domain/ports/out/playlist.repository";
import { mockPlaylist, mockPlaylists } from "../../../mocks/playlist.mock";
import { mockSong } from "../../../mocks/song.mock";

describe("PlaylistService", () => {
  let service: PlaylistService;
  let mockRepository: PlaylistRepository;

  beforeEach(() => {
    mockRepository = {
      create: vi.fn(),
      findAll: vi.fn(),
      findById: vi.fn(),
      addSong: vi.fn(),
      removeSong: vi.fn(),
      delete: vi.fn(),
    };
    service = new PlaylistService(mockRepository);
  });

  describe("createPlaylist", () => {
    it("should call repository create method with correct name", async () => {
      const name = "New Playlist";
      vi.mocked(mockRepository.create).mockResolvedValue(mockPlaylist);

      await service.createPlaylist(name);

      expect(mockRepository.create).toHaveBeenCalledWith(name);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });

    it("should return created playlist", async () => {
      const name = "New Playlist";
      vi.mocked(mockRepository.create).mockResolvedValue(mockPlaylist);

      const result = await service.createPlaylist(name);

      expect(result).toEqual(mockPlaylist);
    });

    it("should propagate repository errors", async () => {
      const name = "Error Playlist";
      const error = new Error("Create error");
      vi.mocked(mockRepository.create).mockRejectedValue(error);

      await expect(service.createPlaylist(name)).rejects.toThrow(
        "Create error"
      );
    });
  });

  describe("getMyPlaylist", () => {
    it("should call repository findAll method", async () => {
      vi.mocked(mockRepository.findAll).mockResolvedValue(mockPlaylists);

      await service.getMyPlaylist();

      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it("should return all playlists", async () => {
      vi.mocked(mockRepository.findAll).mockResolvedValue(mockPlaylists);

      const result = await service.getMyPlaylist();

      expect(result).toEqual(mockPlaylists);
      expect(result).toHaveLength(3);
    });

    it("should return empty array when no playlists exist", async () => {
      vi.mocked(mockRepository.findAll).mockResolvedValue([]);

      const result = await service.getMyPlaylist();

      expect(result).toEqual([]);
    });
  });

  describe("addSongToPlaylist", () => {
    it("should call repository addSong method with correct parameters", async () => {
      const playlistId = "playlist-1";
      vi.mocked(mockRepository.addSong).mockResolvedValue(mockPlaylist);

      await service.addSongToPlaylist(playlistId, mockSong);

      expect(mockRepository.addSong).toHaveBeenCalledWith(playlistId, mockSong);
      expect(mockRepository.addSong).toHaveBeenCalledTimes(1);
    });

    it("should return updated playlist", async () => {
      const playlistId = "playlist-1";
      vi.mocked(mockRepository.addSong).mockResolvedValue(mockPlaylist);

      const result = await service.addSongToPlaylist(playlistId, mockSong);

      expect(result).toEqual(mockPlaylist);
    });
  });

  describe("removeSongFromPlaylist", () => {
    it("should call repository removeSong method with correct parameters", async () => {
      const playlistId = "playlist-1";
      const songId = "song-1";
      vi.mocked(mockRepository.removeSong).mockResolvedValue(mockPlaylist);

      await service.removeSongFromPlaylist(playlistId, songId);

      expect(mockRepository.removeSong).toHaveBeenCalledWith(
        playlistId,
        songId
      );
      expect(mockRepository.removeSong).toHaveBeenCalledTimes(1);
    });

    it("should return updated playlist", async () => {
      const playlistId = "playlist-1";
      const songId = "song-1";
      vi.mocked(mockRepository.removeSong).mockResolvedValue(mockPlaylist);

      const result = await service.removeSongFromPlaylist(playlistId, songId);

      expect(result).toEqual(mockPlaylist);
    });
  });

  describe("deletePlaylist", () => {
    it("should call repository delete method with correct id", async () => {
      const playlistId = "playlist-1";
      vi.mocked(mockRepository.delete).mockResolvedValue();

      await service.deletePlaylist(playlistId);

      expect(mockRepository.delete).toHaveBeenCalledWith(playlistId);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });

    it("should not return anything", async () => {
      const playlistId = "playlist-1";
      vi.mocked(mockRepository.delete).mockResolvedValue();

      const result = await service.deletePlaylist(playlistId);

      expect(result).toBeUndefined();
    });

    it("should propagate repository errors", async () => {
      const playlistId = "playlist-1";
      const error = new Error("Delete error");
      vi.mocked(mockRepository.delete).mockRejectedValue(error);

      await expect(service.deletePlaylist(playlistId)).rejects.toThrow(
        "Delete error"
      );
    });
  });
});
