import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("../infraestructure/driven/firebase/firebase.client", () => ({
  FirebaseClient: vi.fn().mockImplementation(() => ({
    getPlaylist: vi.fn().mockResolvedValue([]),
    getPlaylistById: vi.fn().mockResolvedValue(null),
    createPlaylist: vi.fn().mockResolvedValue("mock-id"),
    deletePlaylist: vi.fn().mockResolvedValue(undefined),
    addSongToPlaylist: vi.fn().mockResolvedValue(undefined),
    removeSongFromPlaylist: vi.fn().mockResolvedValue(undefined),
  })),
}));

vi.mock("../infraestructure/driven/spotify/spotify.client", () => ({
  SpotifyClient: vi.fn().mockImplementation(() => ({
    searchSongs: vi.fn().mockResolvedValue([]),
  })),
}));

vi.mock("*.scss", () => ({}));
vi.mock("*.css", () => ({}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
