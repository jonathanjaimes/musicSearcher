import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
} from "../../../../../../tests/utils/test-utils";
import DeletePlaylistModal from "../../../../../../infraestructure/driving/web/components/playlist/DeletePlaylistModal";
import { mockPlaylist } from "../../../../../../tests/mocks/playlist.mock";

describe("DeletePlaylistModal", () => {
  const defaultProps = {
    playlist: mockPlaylist,
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
    onOverlayClick: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render modal with correct title and message", () => {
    render(<DeletePlaylistModal {...defaultProps} />);

    expect(
      screen.getByText("Eliminar lista de reproducción")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `¿Estás seguro de que quieres eliminar la lista "${mockPlaylist.name}"?`
      )
    ).toBeInTheDocument();
  });

  it("should render confirm and cancel buttons", () => {
    render(<DeletePlaylistModal {...defaultProps} />);

    expect(screen.getByText("Eliminar")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("should call onConfirm when confirm button is clicked", () => {
    render(<DeletePlaylistModal {...defaultProps} />);

    const confirmButton = screen.getByText("Eliminar");
    fireEvent.click(confirmButton);

    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  it("should call onCancel when cancel button is clicked", () => {
    render(<DeletePlaylistModal {...defaultProps} />);

    const cancelButton = screen.getByText("Cancelar");
    fireEvent.click(cancelButton);

    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it("should call onOverlayClick when overlay is clicked", () => {
    render(<DeletePlaylistModal {...defaultProps} />);

    const overlay = document.querySelector(".modal-overlay");
    fireEvent.click(overlay!);

    expect(defaultProps.onOverlayClick).toHaveBeenCalledTimes(1);
  });

  it("should not call onOverlayClick when modal content is clicked", () => {
    render(<DeletePlaylistModal {...defaultProps} />);

    const modalContent = document.querySelector(".modal-content");
    fireEvent.click(modalContent!);

    expect(defaultProps.onOverlayClick).not.toHaveBeenCalled();
  });

  it("should display playlist name in confirmation message", () => {
    const customPlaylist = {
      ...mockPlaylist,
      name: "My Custom Playlist",
    };

    render(<DeletePlaylistModal {...defaultProps} playlist={customPlaylist} />);

    expect(
      screen.getByText(
        '¿Estás seguro de que quieres eliminar la lista "My Custom Playlist"?'
      )
    ).toBeInTheDocument();
  });

  it("should have correct CSS classes", () => {
    render(<DeletePlaylistModal {...defaultProps} />);

    expect(document.querySelector(".modal-overlay")).toBeInTheDocument();
    expect(document.querySelector(".modal-content")).toBeInTheDocument();
    expect(document.querySelector(".modal-actions")).toBeInTheDocument();
    expect(document.querySelector(".confirm-button")).toBeInTheDocument();
    expect(document.querySelector(".cancel-button")).toBeInTheDocument();
  });

  it("should render title in h2 element", () => {
    render(<DeletePlaylistModal {...defaultProps} />);

    const title = screen.getByText("Eliminar lista de reproducción");
    expect(title.tagName).toBe("H2");
  });

  it("should render message in paragraph element", () => {
    render(<DeletePlaylistModal {...defaultProps} />);

    const message = screen.getByText(
      `¿Estás seguro de que quieres eliminar la lista "${mockPlaylist.name}"?`
    );
    expect(message.tagName).toBe("P");
  });

  it("should handle playlist with empty name", () => {
    const playlistWithEmptyName = {
      ...mockPlaylist,
      name: "",
    };

    render(
      <DeletePlaylistModal {...defaultProps} playlist={playlistWithEmptyName} />
    );

    expect(
      screen.getByText('¿Estás seguro de que quieres eliminar la lista ""?')
    ).toBeInTheDocument();
  });

  it("should handle playlist with special characters in name", () => {
    const playlistWithSpecialChars = {
      ...mockPlaylist,
      name: 'Playlist with "quotes" & symbols!',
    };

    render(
      <DeletePlaylistModal
        {...defaultProps}
        playlist={playlistWithSpecialChars}
      />
    );

    expect(
      screen.getByText(
        '¿Estás seguro de que quieres eliminar la lista "Playlist with "quotes" & symbols!"?'
      )
    ).toBeInTheDocument();
  });

  it("should pass event object to onOverlayClick", () => {
    render(<DeletePlaylistModal {...defaultProps} />);

    const overlay = document.querySelector(".modal-overlay");
    const clickEvent = new MouseEvent("click", { bubbles: true });

    fireEvent.click(overlay!, clickEvent);

    expect(defaultProps.onOverlayClick).toHaveBeenCalledWith(
      expect.any(Object)
    );
  });

  it("should not interfere with button clicks inside modal content", () => {
    render(<DeletePlaylistModal {...defaultProps} />);

    const confirmButton = screen.getByText("Eliminar");
    fireEvent.click(confirmButton);

    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
    expect(defaultProps.onOverlayClick).not.toHaveBeenCalled();
  });
});
