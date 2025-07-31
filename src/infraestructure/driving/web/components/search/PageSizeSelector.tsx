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
  const options = [5, 10, 20, 40];

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
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="total-items">de {totalItems} resultados</span>
    </div>
  );
};

export default PageSizeSelector;
