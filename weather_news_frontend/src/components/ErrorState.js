import React from 'react';

/**
 * ErrorState displays an error message in a styled container.
 * Props:
 * - message: string
 */
const ErrorState = ({ message = 'An unexpected error occurred.' }) => {
  return (
    <div className="error-state" role="alert">
      <div style={{ color: 'var(--error)', fontWeight: 700, marginBottom: 6 }}>Error</div>
      <div style={{ color: 'var(--text)' }}>{message}</div>
    </div>
  );
};

export default ErrorState;
