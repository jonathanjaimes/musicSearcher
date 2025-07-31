import { describe, it, expect, vi, beforeEach } from "vitest";
import { SearchSongService } from "../../../../core/search/application/search-song.service";
import type { SongRepository } from "../../../../core/search/domain/ports/out/song.repository";
import { mockSongs } from "../../../mocks/song.mock";

describe("SearchSongService", () => {
  let service: SearchSongService;
  let mockRepository: SongRepository;

  beforeEach(() => {
    mockRepository = {
      searchSongs: vi.fn(),
    };
    service = new SearchSongService(mockRepository);
  });

  describe("search", () => {
    it("should call repository searchSongs method with correct query", async () => {
      const query = "test query";
      vi.mocked(mockRepository.searchSongs).mockResolvedValue(mockSongs);

      await service.search(query);

      expect(mockRepository.searchSongs).toHaveBeenCalledWith(query);
      expect(mockRepository.searchSongs).toHaveBeenCalledTimes(1);
    });

    it("should return songs from repository", async () => {
      const query = "test query";
      vi.mocked(mockRepository.searchSongs).mockResolvedValue(mockSongs);

      const result = await service.search(query);

      expect(result).toEqual(mockSongs);
      expect(result).toHaveLength(3);
    });

    it("should return empty array when no songs found", async () => {
      const query = "no results";
      vi.mocked(mockRepository.searchSongs).mockResolvedValue([]);

      const result = await service.search(query);

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it("should propagate repository errors", async () => {
      const query = "error query";
      const error = new Error("Repository error");
      vi.mocked(mockRepository.searchSongs).mockRejectedValue(error);

      await expect(service.search(query)).rejects.toThrow("Repository error");
    });

    it("should handle empty string query", async () => {
      const query = "";
      vi.mocked(mockRepository.searchSongs).mockResolvedValue([]);

      const result = await service.search(query);

      expect(mockRepository.searchSongs).toHaveBeenCalledWith("");
      expect(result).toEqual([]);
    });
  });
});
