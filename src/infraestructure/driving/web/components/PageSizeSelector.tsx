import React from "react";
import "./PageSizeSelector.scss";

interface PageSizeSelectorProps {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  totalItems: number;
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
  pageSize,
  onPageSizeChange,
  totalItems,
}) => {
  const pageSizeOptions = [5, 10, 20, 40];

  return (
    <div className="page-size-selector">
      <label htmlFor="page-size-select" className="page-size-label">
        Mostrar:
      </label>
      <select
        id="page-size-select"
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="page-size-select"
      >
        {pageSizeOptions.map((size) => (
          <option key={size} value={size}>
            {size} resultados
          </option>
        ))}
      </select>
      <span className="total-items">de {totalItems} total</span>
    </div>
  );
};

export default PageSizeSelector;
