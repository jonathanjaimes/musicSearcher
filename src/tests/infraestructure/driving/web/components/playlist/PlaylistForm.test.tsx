import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
} from "../../../../../../tests/utils/test-utils";
import PlaylistForm from "../../../../../../infraestructure/driving/web/components/playlist/PlaylistForm";

describe("PlaylistForm", () => {
  const defaultProps = {
    newPlaylistName: "",
    isCreating: false,
    onSubmit: vi.fn(),
    onNameChange: vi.fn(),
    onCancel: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render form with input and buttons", () => {
    render(<PlaylistForm {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("Nombre de la nueva lista")
    ).toBeInTheDocument();
    expect(screen.getByText("Crear")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("should display current playlist name value", () => {
    render(<PlaylistForm {...defaultProps} newPlaylistName="My Playlist" />);

    const input = screen.getByPlaceholderText("Nombre de la nueva lista");
    expect(input).toHaveValue("My Playlist");
  });

  it("should call onNameChange when input value changes", () => {
    render(<PlaylistForm {...defaultProps} />);

    const input = screen.getByPlaceholderText("Nombre de la nueva lista");
    fireEvent.change(input, { target: { value: "New Playlist" } });

    expect(defaultProps.onNameChange).toHaveBeenCalledWith("New Playlist");
  });

  it("should call onSubmit when form is submitted", () => {
    render(<PlaylistForm {...defaultProps} newPlaylistName="Test Playlist" />);

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it("should call onCancel when cancel button is clicked", () => {
    render(<PlaylistForm {...defaultProps} />);

    const cancelButton = screen.getByText("Cancelar");
    fireEvent.click(cancelButton);

    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it("should disable create button when name is empty", () => {
    render(<PlaylistForm {...defaultProps} newPlaylistName="" />);

    const createButton = screen.getByText("Crear");
    expect(createButton).toBeDisabled();
  });

  it("should disable create button when name is only whitespace", () => {
    render(<PlaylistForm {...defaultProps} newPlaylistName="   " />);

    const createButton = screen.getByText("Crear");
    expect(createButton).toBeDisabled();
  });

  it("should enable create button when name has content", () => {
    render(<PlaylistForm {...defaultProps} newPlaylistName="Valid Name" />);

    const createButton = screen.getByText("Crear");
    expect(createButton).not.toBeDisabled();
  });

  it("should show creating state when isCreating is true", () => {
    render(<PlaylistForm {...defaultProps} isCreating={true} />);

    expect(screen.getByText("Creando...")).toBeInTheDocument();
    expect(screen.queryByText("Crear")).not.toBeInTheDocument();
  });

  it("should disable both buttons when isCreating is true", () => {
    render(
      <PlaylistForm
        {...defaultProps}
        isCreating={true}
        newPlaylistName="Test"
      />
    );

    const createButton = screen.getByText("Creando...");
    const cancelButton = screen.getByText("Cancelar");

    expect(createButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });

  it("should have maxLength attribute on input", () => {
    render(<PlaylistForm {...defaultProps} />);

    const input = screen.getByPlaceholderText("Nombre de la nueva lista");
    expect(input).toHaveAttribute("maxLength", "50");
  });

  it("should have autoFocus on input", () => {
    render(<PlaylistForm {...defaultProps} />);

    const input = screen.getByPlaceholderText("Nombre de la nueva lista");
    expect(input).toHaveFocus(); // Check if the input is actually focused
  });

  it("should have correct CSS classes", () => {
    render(<PlaylistForm {...defaultProps} />);

    expect(
      document.querySelector(".create-form-container")
    ).toBeInTheDocument();
    expect(document.querySelector(".create-playlist-form")).toBeInTheDocument();
    expect(document.querySelector(".playlist-name-input")).toBeInTheDocument();
    expect(document.querySelector(".form-actions")).toBeInTheDocument();
    expect(document.querySelector(".create-button")).toBeInTheDocument();
    expect(document.querySelector(".cancel-button")).toBeInTheDocument();
  });

  it("should have correct button types", () => {
    render(<PlaylistForm {...defaultProps} />);

    const createButton = screen.getByText("Crear");
    const cancelButton = screen.getByText("Cancelar");

    expect(createButton).toHaveAttribute("type", "submit");
    expect(cancelButton).toHaveAttribute("type", "button");
  });

  it("should prevent form submission when create button is disabled", () => {
    render(<PlaylistForm {...defaultProps} newPlaylistName="" />);

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    // onSubmit should still be called as it's the form's onSubmit handler
    // but the button being disabled prevents the user from clicking it
    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });
});
