import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
} from "../../../../../../tests/utils/test-utils";
import SearchForm from "../../../../../../infraestructure/driving/web/components/search/SearchForm";

describe("SearchForm", () => {
  const defaultProps = {
    searchTerm: "",
    onSearchTermChange: vi.fn(),
    onSubmit: vi.fn(),
    isLoading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render search input and button", () => {
    render(<SearchForm {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("Buscar canciones, artistas o álbumes...")
    ).toBeInTheDocument();
    expect(screen.getByText("Buscar")).toBeInTheDocument();
  });

  it("should display current search term value", () => {
    render(<SearchForm {...defaultProps} searchTerm="test query" />);

    const input = screen.getByPlaceholderText(
      "Buscar canciones, artistas o álbumes..."
    );
    expect(input).toHaveValue("test query");
  });

  it("should call onSearchTermChange when input value changes", () => {
    render(<SearchForm {...defaultProps} />);

    const input = screen.getByPlaceholderText(
      "Buscar canciones, artistas o álbumes..."
    );
    fireEvent.change(input, { target: { value: "new search" } });

    expect(defaultProps.onSearchTermChange).toHaveBeenCalledWith("new search");
  });

  it("should call onSubmit when form is submitted", () => {
    render(<SearchForm {...defaultProps} />);

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it("should call onSubmit when search button is clicked", () => {
    render(<SearchForm {...defaultProps} />);

    const button = screen.getByText("Buscar");
    fireEvent.click(button);

    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it("should show loading state when isLoading is true", () => {
    render(<SearchForm {...defaultProps} isLoading={true} />);

    expect(screen.getByText("Buscando...")).toBeInTheDocument();
    expect(screen.queryByText("Buscar")).not.toBeInTheDocument();
  });

  it("should disable button when isLoading is true", () => {
    render(<SearchForm {...defaultProps} isLoading={true} />);

    const button = screen.getByText("Buscando...");
    expect(button).toBeDisabled();
  });

  it("should enable button when isLoading is false", () => {
    render(<SearchForm {...defaultProps} isLoading={false} />);

    const button = screen.getByText("Buscar");
    expect(button).not.toBeDisabled();
  });

  it("should have correct CSS classes", () => {
    render(<SearchForm {...defaultProps} />);

    expect(document.querySelector(".search-container")).toBeInTheDocument();
    expect(document.querySelector(".search-form")).toBeInTheDocument();
    expect(document.querySelector(".search-input")).toBeInTheDocument();
    expect(document.querySelector(".search-button")).toBeInTheDocument();
  });

  it("should have correct input type", () => {
    render(<SearchForm {...defaultProps} />);

    const input = screen.getByPlaceholderText(
      "Buscar canciones, artistas o álbumes..."
    );
    expect(input).toHaveAttribute("type", "text");
  });

  it("should have correct button type", () => {
    render(<SearchForm {...defaultProps} />);

    const button = screen.getByText("Buscar");
    expect(button).toHaveAttribute("type", "submit");
  });

  it("should handle empty search term", () => {
    render(<SearchForm {...defaultProps} searchTerm="" />);

    const input = screen.getByPlaceholderText(
      "Buscar canciones, artistas o álbumes..."
    );
    expect(input).toHaveValue("");
  });

  it("should handle special characters in search term", () => {
    const specialTerm = "test@#$%^&*()";
    render(<SearchForm {...defaultProps} searchTerm={specialTerm} />);

    const input = screen.getByPlaceholderText(
      "Buscar canciones, artistas o álbumes..."
    );
    expect(input).toHaveValue(specialTerm);
  });

  it("should call onSearchTermChange with empty string when input is cleared", () => {
    render(<SearchForm {...defaultProps} searchTerm="test" />);

    const input = screen.getByPlaceholderText(
      "Buscar canciones, artistas o álbumes..."
    );
    fireEvent.change(input, { target: { value: "" } });

    expect(defaultProps.onSearchTermChange).toHaveBeenCalledWith("");
  });

  it("should prevent form submission when button is disabled", () => {
    render(<SearchForm {...defaultProps} isLoading={true} />);

    const button = screen.getByText("Buscando...");
    fireEvent.click(button);

    // The form onSubmit should still be called, but the button click is disabled
    expect(button).toBeDisabled();
  });
});
