import { describe, it, expect } from "vitest";
import type { Song } from "../../../../../core/search/domain/models/song";
import { mockSong, createMockSong } from "../../../../mocks/song.mock";

describe("Song Model", () => {
  it("should have correct interface structure", () => {
    expect(mockSong).toHaveProperty("id");
    expect(mockSong).toHaveProperty("title");
    expect(mockSong).toHaveProperty("artist");
    expect(mockSong).toHaveProperty("album");
    expect(mockSong).toHaveProperty("imageUrl");
  });

  it("should have string type properties", () => {
    expect(typeof mockSong.id).toBe("string");
    expect(typeof mockSong.title).toBe("string");
    expect(typeof mockSong.artist).toBe("string");
    expect(typeof mockSong.album).toBe("string");
    expect(typeof mockSong.imageUrl).toBe("string");
  });

  it("should create song with custom properties", () => {
    const customSong = createMockSong({
      id: "custom-id",
      title: "Custom Title",
    });

    expect(customSong.id).toBe("custom-id");
    expect(customSong.title).toBe("Custom Title");
    expect(customSong.artist).toBe(mockSong.artist);
  });

  it("should maintain immutability", () => {
    const originalSong: Song = { ...mockSong };
    const modifiedSong = createMockSong({ title: "Modified" });

    expect(originalSong.title).not.toBe(modifiedSong.title);
    expect(originalSong.id).toBe(modifiedSong.id);
  });
});
