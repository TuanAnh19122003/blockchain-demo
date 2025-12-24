import React from 'react';
import { FaUpload, FaCheckCircle } from 'react-icons/fa';

const ActionButtons = ({ onUpload, onVerify, loadingUpload, loadingVerify }) => (
  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
    <button
      onClick={onUpload}
      disabled={loadingUpload}
      className={`w-full sm:w-auto px-6 py-3 md:px-4 md:py-2 rounded hover:bg-blue-600 disabled:bg-blue-300 flex items-center justify-center space-x-2 text-base md:text-sm ${loadingUpload ? 'bg-yellow-500 animate-pulse' : 'bg-blue-500 text-white'}`}
    >
      <FaUpload />
      <span>{loadingUpload ? "Uploading..." : "Upload & Store Hash"}</span>
    </button>

    <button
      onClick={onVerify}
      disabled={loadingVerify}
      className={`w-full sm:w-auto px-6 py-3 md:px-4 md:py-2 rounded hover:bg-green-600 disabled:bg-green-300 flex items-center justify-center space-x-2 text-base md:text-sm ${loadingVerify ? 'bg-yellow-500 animate-pulse' : 'bg-green-500 text-white'}`}
    >
      <FaCheckCircle />
      <span>{loadingVerify ? "Verifying..." : "Verify Hash"}</span>
    </button>
  </div>
);

export default ActionButtons;