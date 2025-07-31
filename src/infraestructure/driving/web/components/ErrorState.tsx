import React from "react";
import "./ErrorState.scss";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Error",
  message,
  onRetry,
}) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h2>{title}</h2>
      <p>{message}</p>
      {onRetry && (
        <button className="retry-button" onClick={onRetry}>
          Intentar de nuevo
        </button>
      )}
    </div>
  );
};

export default ErrorState;
