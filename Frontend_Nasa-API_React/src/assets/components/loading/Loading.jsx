import React from 'react';
import loading from '../../img/loading.gif';

const LoadingOverlay = () => {
  return (
    <div id="loading-overlay" className="loading-overlay">
      <img src={loading} alt="Loading..." />
    </div>
  );
};

export default LoadingOverlay;