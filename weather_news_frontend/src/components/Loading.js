import React from 'react';

/**
 * Loading shows a simple spinner and message.
 * Props:
 * - message: string
 */
const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="loading" role="status" aria-live="polite">
      <div style={{
        display: 'grid',
        placeItems: 'center',
        gap: 8
      }}>
        <div
          aria-hidden="true"
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: '3px solid rgba(37,99,235,0.25)',
            borderTopColor: '#2563EB',
            animation: 'spin 1s linear infinite'
          }}
        />
        <div>{message}</div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Loading;
