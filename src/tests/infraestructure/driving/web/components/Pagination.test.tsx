import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "../../../../utils/test-utils";
import Pagination from "../../../../../infraestructure/driving/web/components/Pagination";

describe("Pagination", () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    onPageChange: vi.fn(),
    onPreviousPage: vi.fn(),
    onNextPage: vi.fn(),
    hasNextPage: true,
    hasPreviousPage: false,
    startIndex: 0,
    endIndex: 10,
    totalItems: 50,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not render when totalPages is 1 or less", () => {
    const { container } = render(
      <Pagination {...defaultProps} totalPages={1} />
    );

    expect(container.firstChild).toBeNull();
  });

  it("should render pagination info correctly", () => {
    render(<Pagination {...defaultProps} />);

    expect(
      screen.getByText("Mostrando 1-10 de 50 resultados")
    ).toBeInTheDocument();
  });

  it("should render all page numbers when totalPages <= 5", () => {
    render(<Pagination {...defaultProps} totalPages={3} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("should render ellipsis when totalPages > 5 and currentPage <= 3", () => {
    render(<Pagination {...defaultProps} totalPages={10} currentPage={2} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("should render ellipsis when currentPage is near the end", () => {
    render(<Pagination {...defaultProps} totalPages={10} currentPage={9} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("should render ellipsis on both sides when currentPage is in the middle", () => {
    render(<Pagination {...defaultProps} totalPages={10} currentPage={5} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getAllByText("...")).toHaveLength(2);
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("should highlight current page", () => {
    render(<Pagination {...defaultProps} currentPage={3} />);

    const currentPageButton = screen.getByText("3");
    expect(currentPageButton).toHaveClass("pagination-btn--active");
  });

  it("should call onPageChange when page number is clicked", () => {
    render(<Pagination {...defaultProps} />);

    const pageButton = screen.getByText("2");
    fireEvent.click(pageButton);

    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it("should call onPreviousPage when previous button is clicked", () => {
    render(<Pagination {...defaultProps} hasPreviousPage={true} />);

    const previousButton = screen.getByTitle("Página anterior");
    fireEvent.click(previousButton);

    expect(defaultProps.onPreviousPage).toHaveBeenCalledTimes(1);
  });

  it("should call onNextPage when next button is clicked", () => {
    render(<Pagination {...defaultProps} />);

    const nextButton = screen.getByTitle("Página siguiente");
    fireEvent.click(nextButton);

    expect(defaultProps.onNextPage).toHaveBeenCalledTimes(1);
  });

  it("should disable previous button when hasPreviousPage is false", () => {
    render(<Pagination {...defaultProps} hasPreviousPage={false} />);

    const previousButton = screen.getByTitle("Página anterior");
    expect(previousButton).toBeDisabled();
  });

  it("should disable next button when hasNextPage is false", () => {
    render(<Pagination {...defaultProps} hasNextPage={false} />);

    const nextButton = screen.getByTitle("Página siguiente");
    expect(nextButton).toBeDisabled();
  });

  it("should have correct CSS classes", () => {
    render(<Pagination {...defaultProps} />);

    expect(document.querySelector(".pagination")).toBeInTheDocument();
    expect(document.querySelector(".pagination-info")).toBeInTheDocument();
    expect(document.querySelector(".pagination-controls")).toBeInTheDocument();
    expect(document.querySelector(".pagination-numbers")).toBeInTheDocument();
  });

  it("should render navigation arrows correctly", () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByText("←")).toBeInTheDocument();
    expect(screen.getByText("→")).toBeInTheDocument();
  });

  it("should update pagination info with different values", () => {
    render(
      <Pagination
        {...defaultProps}
        startIndex={10}
        endIndex={20}
        totalItems={100}
      />
    );

    expect(
      screen.getByText("Mostrando 11-20 de 100 resultados")
    ).toBeInTheDocument();
  });

  it("should not call onPageChange when ellipsis is clicked", () => {
    render(<Pagination {...defaultProps} totalPages={10} currentPage={5} />);

    const ellipsis = screen.getAllByText("...")[0];
    fireEvent.click(ellipsis);

    expect(defaultProps.onPageChange).not.toHaveBeenCalled();
  });
});
