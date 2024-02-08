/**
 * Represents a loading indicator component.
 * This component is used to display a spinner while content is being loaded.
 */
import React from "react";

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex w-full justify-center align-middle">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingIndicator;
