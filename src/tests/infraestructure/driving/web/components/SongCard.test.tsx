import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "../../../../utils/test-utils";
import SongCard from "../../../../../infraestructure/driving/web/components/SongCard";
import { mockSong } from "../../../../mocks/song.mock";
import { mockPlaylists } from "../../../../mocks/playlist.mock";

// Mock the useSongInPlaylist hook
vi.mock(
  "../../../../../infraestructure/driving/web/hooks/useSongInPlaylist",
  () => ({
    useSongInPlaylist: vi.fn(),
  })
);

import { useSongInPlaylist } from "../../../../../infraestructure/driving/web/hooks/useSongInPlaylist";

describe("SongCard", () => {
  const mockOnAddToPlaylist = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render song information correctly", () => {
    vi.mocked(useSongInPlaylist).mockReturnValue({
      isInPlaylist: false,
      playlistName: undefined,
      playlistId: undefined,
    });

    render(
      <SongCard
        song={mockSong}
        playlists={mockPlaylists}
        onAddToPlaylist={mockOnAddToPlaylist}
      />
    );

    expect(screen.getByText(mockSong.title)).toBeInTheDocument();
    expect(screen.getByText(mockSong.artist)).toBeInTheDocument();
    expect(screen.getByText(mockSong.album)).toBeInTheDocument();
  });

  it("should render song image with correct attributes", () => {
    vi.mocked(useSongInPlaylist).mockReturnValue({
      isInPlaylist: false,
      playlistName: undefined,
      playlistId: undefined,
    });

    render(
      <SongCard
        song={mockSong}
        playlists={mockPlaylists}
        onAddToPlaylist={mockOnAddToPlaylist}
      />
    );

    const image = screen.getByAltText(`Portada de ${mockSong.title}`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockSong.imageUrl);
    expect(image).toHaveClass("song-image");
  });

  it("should show add to playlist button when song is not in any playlist", () => {
    vi.mocked(useSongInPlaylist).mockReturnValue({
      isInPlaylist: false,
      playlistName: undefined,
      playlistId: undefined,
    });

    render(
      <SongCard
        song={mockSong}
        playlists={mockPlaylists}
        onAddToPlaylist={mockOnAddToPlaylist}
      />
    );

    const addButton = screen.getByText("Agregar a una lista");
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveAttribute("title", "Agregar a una lista");
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  it("should call onAddToPlaylist when add button is clicked", () => {
    vi.mocked(useSongInPlaylist).mockReturnValue({
      isInPlaylist: false,
      playlistName: undefined,
      playlistId: undefined,
    });

    render(
      <SongCard
        song={mockSong}
        playlists={mockPlaylists}
        onAddToPlaylist={mockOnAddToPlaylist}
      />
    );

    const addButton = screen.getByText("Agregar a una lista");
    fireEvent.click(addButton);

    expect(mockOnAddToPlaylist).toHaveBeenCalledWith(mockSong);
    expect(mockOnAddToPlaylist).toHaveBeenCalledTimes(1);
  });

  it("should show already in playlist message when song is in a playlist", () => {
    const playlistName = "My Favorite Songs";
    vi.mocked(useSongInPlaylist).mockReturnValue({
      isInPlaylist: true,
      playlistName,
      playlistId: "playlist-1",
    });

    render(
      <SongCard
        song={mockSong}
        playlists={mockPlaylists}
        onAddToPlaylist={mockOnAddToPlaylist}
      />
    );

    expect(screen.getByText("Ya está en:")).toBeInTheDocument();
    expect(screen.getByText(playlistName)).toBeInTheDocument();
    expect(screen.queryByText("Agregar a una lista")).not.toBeInTheDocument();
  });

  it("should have correct CSS classes", () => {
    vi.mocked(useSongInPlaylist).mockReturnValue({
      isInPlaylist: false,
      playlistName: undefined,
      playlistId: undefined,
    });

    render(
      <SongCard
        song={mockSong}
        playlists={mockPlaylists}
        onAddToPlaylist={mockOnAddToPlaylist}
      />
    );

    expect(document.querySelector(".song-card")).toBeInTheDocument();
    expect(document.querySelector(".song-info")).toBeInTheDocument();
    expect(document.querySelector(".song-actions")).toBeInTheDocument();
    expect(document.querySelector(".song-title")).toBeInTheDocument();
    expect(document.querySelector(".song-artist")).toBeInTheDocument();
    expect(document.querySelector(".song-album")).toBeInTheDocument();
  });

  it("should render title in h2 element", () => {
    vi.mocked(useSongInPlaylist).mockReturnValue({
      isInPlaylist: false,
      playlistName: undefined,
      playlistId: undefined,
    });

    render(
      <SongCard
        song={mockSong}
        playlists={mockPlaylists}
        onAddToPlaylist={mockOnAddToPlaylist}
      />
    );

    const title = screen.getByText(mockSong.title);
    expect(title.tagName).toBe("H2");
  });

  it("should render artist and album in paragraph elements", () => {
    vi.mocked(useSongInPlaylist).mockReturnValue({
      isInPlaylist: false,
      playlistName: undefined,
      playlistId: undefined,
    });

    render(
      <SongCard
        song={mockSong}
        playlists={mockPlaylists}
        onAddToPlaylist={mockOnAddToPlaylist}
      />
    );

    const artist = screen.getByText(mockSong.artist);
    const album = screen.getByText(mockSong.album);

    expect(artist.tagName).toBe("P");
    expect(album.tagName).toBe("P");
  });

  it("should call useSongInPlaylist with correct parameters", () => {
    vi.mocked(useSongInPlaylist).mockReturnValue({
      isInPlaylist: false,
      playlistName: undefined,
      playlistId: undefined,
    });

    render(
      <SongCard
        song={mockSong}
        playlists={mockPlaylists}
        onAddToPlaylist={mockOnAddToPlaylist}
      />
    );

    expect(useSongInPlaylist).toHaveBeenCalledWith(mockSong, mockPlaylists);
  });
});
