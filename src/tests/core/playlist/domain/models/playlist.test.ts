import { describe, it, expect } from "vitest";

import {
  mockPlaylist,
  createMockPlaylist,
} from "../../../../mocks/playlist.mock";
import { mockSongs } from "../../../../mocks/song.mock";

describe("Playlist Model", () => {
  it("should have correct interface structure", () => {
    expect(mockPlaylist).toHaveProperty("id");
    expect(mockPlaylist).toHaveProperty("name");
    expect(mockPlaylist).toHaveProperty("songs");
  });

  it("should have correct property types", () => {
    expect(typeof mockPlaylist.id).toBe("string");
    expect(typeof mockPlaylist.name).toBe("string");
    expect(Array.isArray(mockPlaylist.songs)).toBe(true);
  });

  it("should contain songs array with Song objects", () => {
    expect(mockPlaylist.songs).toHaveLength(3);
    expect(mockPlaylist.songs[0]).toHaveProperty("id");
    expect(mockPlaylist.songs[0]).toHaveProperty("title");
    expect(mockPlaylist.songs[0]).toHaveProperty("artist");
  });

  it("should create playlist with custom properties", () => {
    const customPlaylist = createMockPlaylist({
      id: "custom-id",
      name: "Custom Playlist",
      songs: [],
    });

    expect(customPlaylist.id).toBe("custom-id");
    expect(customPlaylist.name).toBe("Custom Playlist");
    expect(customPlaylist.songs).toHaveLength(0);
  });

  it("should handle empty songs array", () => {
    const emptyPlaylist = createMockPlaylist({ songs: [] });
    expect(emptyPlaylist.songs).toHaveLength(0);
    expect(Array.isArray(emptyPlaylist.songs)).toBe(true);
  });

  it("should maintain reference integrity with songs", () => {
    const playlist = createMockPlaylist({ songs: mockSongs });
    expect(playlist.songs).toBe(mockSongs);
    expect(playlist.songs[0].id).toBe(mockSongs[0].id);
  });
});
