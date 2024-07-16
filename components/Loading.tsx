import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="text-center">
        <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 mb-4"></div>
        <p className="text-white text-xl">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
