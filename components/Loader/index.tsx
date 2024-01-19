import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="loader ease-linear rounded-full border-t-4 border-primary border-solid h-12 w-12 animate-spin"></div>
    </div>
  );
};

export default Loader;
