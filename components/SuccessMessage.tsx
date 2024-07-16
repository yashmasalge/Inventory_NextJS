import React from 'react';

interface SuccessMessageProps {
  message: string;
  onClose: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-700 p-6 rounded-lg w-full max-w-md mx-2">
        <p className="text-white mb-4">{message}</p>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-blue-500 text-white p-2 rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
