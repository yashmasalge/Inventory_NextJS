import React from 'react';

interface ConfirmationDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-700 p-6 rounded-lg w-full max-w-md mx-2">
        <p className="text-white mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          <button onClick={onCancel} className="bg-gray-500 text-white p-2 rounded">No</button>
          <button onClick={onConfirm} className="bg-blue-500 text-white p-2 rounded">Yes</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
