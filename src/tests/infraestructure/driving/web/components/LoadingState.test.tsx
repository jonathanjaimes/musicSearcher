import { describe, it, expect } from "vitest";
import { render, screen } from "../../../../utils/test-utils";
import LoadingState from "../../../../../infraestructure/driving/web/components/LoadingState";

describe("LoadingState", () => {
  it("should render with default message", () => {
    render(<LoadingState />);

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("should render with custom message", () => {
    const customMessage = "Loading custom data...";
    render(<LoadingState message={customMessage} />);

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it("should render loading spinner", () => {
    render(<LoadingState />);

    const spinner = document.querySelector(".loading-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("should have correct CSS classes", () => {
    render(<LoadingState />);

    const container = document.querySelector(".loading-container");
    expect(container).toBeInTheDocument();
  });

  it("should render message in paragraph element", () => {
    const message = "Test message";
    render(<LoadingState message={message} />);

    const paragraph = screen.getByText(message);
    expect(paragraph.tagName).toBe("P");
  });
});
