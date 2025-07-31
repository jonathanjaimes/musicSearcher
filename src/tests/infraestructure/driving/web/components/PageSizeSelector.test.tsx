import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "../../../../utils/test-utils";
import PageSizeSelector from "../../../../../infraestructure/driving/web/components/PageSizeSelector";

describe("PageSizeSelector", () => {
  const defaultProps = {
    pageSize: 10,
    onPageSizeChange: vi.fn(),
    totalItems: 50,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render label, select, and total items text", () => {
    render(<PageSizeSelector {...defaultProps} />);

    expect(screen.getByText("Mostrar:")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("de 50 total")).toBeInTheDocument();
  });

  it("should display current page size as selected option", () => {
    render(<PageSizeSelector {...defaultProps} pageSize={20} />);

    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("20");
  });

  it("should render all page size options", () => {
    render(<PageSizeSelector {...defaultProps} />);

    expect(screen.getByText("5 resultados")).toBeInTheDocument();
    expect(screen.getByText("10 resultados")).toBeInTheDocument();
    expect(screen.getByText("20 resultados")).toBeInTheDocument();
    expect(screen.getByText("40 resultados")).toBeInTheDocument();
  });

  it("should call onPageSizeChange when option is selected", () => {
    render(<PageSizeSelector {...defaultProps} />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "20" } });

    expect(defaultProps.onPageSizeChange).toHaveBeenCalledWith(20);
  });

  it("should convert string value to number when calling onPageSizeChange", () => {
    render(<PageSizeSelector {...defaultProps} />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "5" } });

    expect(defaultProps.onPageSizeChange).toHaveBeenCalledWith(5);
    expect(typeof defaultProps.onPageSizeChange.mock.calls[0][0]).toBe(
      "number"
    );
  });

  it("should display correct total items count", () => {
    render(<PageSizeSelector {...defaultProps} totalItems={100} />);

    expect(screen.getByText("de 100 total")).toBeInTheDocument();
  });

  it("should handle zero total items", () => {
    render(<PageSizeSelector {...defaultProps} totalItems={0} />);

    expect(screen.getByText("de 0 total")).toBeInTheDocument();
  });

  it("should have correct accessibility attributes", () => {
    render(<PageSizeSelector {...defaultProps} />);

    const label = screen.getByText("Mostrar:");
    const select = screen.getByRole("combobox");

    expect(label).toHaveAttribute("for", "page-size-select");
    expect(select).toHaveAttribute("id", "page-size-select");
  });

  it("should have correct CSS classes", () => {
    render(<PageSizeSelector {...defaultProps} />);

    expect(document.querySelector(".page-size-selector")).toBeInTheDocument();
    expect(document.querySelector(".page-size-label")).toBeInTheDocument();
    expect(document.querySelector(".page-size-select")).toBeInTheDocument();
    expect(document.querySelector(".total-items")).toBeInTheDocument();
  });

  it("should render options with correct values", () => {
    render(<PageSizeSelector {...defaultProps} />);

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(4);

    expect(options[0]).toHaveValue("5");
    expect(options[1]).toHaveValue("10");
    expect(options[2]).toHaveValue("20");
    expect(options[3]).toHaveValue("40");
  });

  it("should handle different page sizes correctly", () => {
    const { rerender } = render(
      <PageSizeSelector {...defaultProps} pageSize={5} />
    );

    let select = screen.getByRole("combobox");
    expect(select).toHaveValue("5");

    rerender(<PageSizeSelector {...defaultProps} pageSize={40} />);

    select = screen.getByRole("combobox");
    expect(select).toHaveValue("40");
  });

  it("should update when totalItems changes", () => {
    const { rerender } = render(
      <PageSizeSelector {...defaultProps} totalItems={25} />
    );

    expect(screen.getByText("de 25 total")).toBeInTheDocument();

    rerender(<PageSizeSelector {...defaultProps} totalItems={75} />);

    expect(screen.getByText("de 75 total")).toBeInTheDocument();
  });

  it("should call onPageSizeChange only once per change", () => {
    render(<PageSizeSelector {...defaultProps} />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "20" } });

    expect(defaultProps.onPageSizeChange).toHaveBeenCalledTimes(1);
  });
});
