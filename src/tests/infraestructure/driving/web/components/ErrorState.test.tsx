import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "../../../../utils/test-utils";
import ErrorState from "../../../../../infraestructure/driving/web/components/ErrorState";

describe("ErrorState", () => {
  it("should render with required message", () => {
    const message = "Something went wrong";
    render(<ErrorState message={message} />);

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("should render with default title", () => {
    render(<ErrorState message="Error message" />);

    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("should render with custom title", () => {
    const customTitle = "Custom Error";
    render(<ErrorState title={customTitle} message="Error message" />);

    expect(screen.getByText(customTitle)).toBeInTheDocument();
  });

  it("should render error icon", () => {
    render(<ErrorState message="Error message" />);

    expect(screen.getByText("⚠️")).toBeInTheDocument();
  });

  it("should not render retry button when onRetry is not provided", () => {
    render(<ErrorState message="Error message" />);

    expect(screen.queryByText("Intentar de nuevo")).not.toBeInTheDocument();
  });

  it("should render retry button when onRetry is provided", () => {
    const onRetry = vi.fn();
    render(<ErrorState message="Error message" onRetry={onRetry} />);

    expect(screen.getByText("Intentar de nuevo")).toBeInTheDocument();
  });

  it("should call onRetry when retry button is clicked", () => {
    const onRetry = vi.fn();
    render(<ErrorState message="Error message" onRetry={onRetry} />);

    const retryButton = screen.getByText("Intentar de nuevo");
    fireEvent.click(retryButton);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("should have correct CSS classes", () => {
    render(<ErrorState message="Error message" />);

    const container = document.querySelector(".error-container");
    const icon = document.querySelector(".error-icon");

    expect(container).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it("should render title in h2 element", () => {
    render(<ErrorState message="Error message" />);

    const title = screen.getByText("Error");
    expect(title.tagName).toBe("H2");
  });

  it("should render message in paragraph element", () => {
    const message = "Test error message";
    render(<ErrorState message={message} />);

    const paragraph = screen.getByText(message);
    expect(paragraph.tagName).toBe("P");
  });

  it("should have retry button with correct class", () => {
    const onRetry = vi.fn();
    render(<ErrorState message="Error message" onRetry={onRetry} />);

    const retryButton = screen.getByText("Intentar de nuevo");
    expect(retryButton).toHaveClass("retry-button");
  });
});
