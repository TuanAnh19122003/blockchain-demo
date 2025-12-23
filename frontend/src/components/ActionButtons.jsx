import React from 'react';
import { FaUpload, FaCheckCircle } from 'react-icons/fa';

const ActionButtons = ({ onUpload, onVerify, loadingUpload, loadingVerify }) => (
  <div className="flex space-x-4 mb-6">
    <button
      onClick={onUpload}
      disabled={loadingUpload}
      className={`px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300 flex items-center space-x-2 ${loadingUpload ? 'bg-yellow-500 animate-pulse' : 'bg-blue-500 text-white'}`}
    >
      <FaUpload />
      <span>{loadingUpload ? "Uploading..." : "Upload & Store Hash"}</span>
    </button>

    <button
      onClick={onVerify}
      disabled={loadingVerify}
      className={`px-4 py-2 rounded hover:bg-green-600 disabled:bg-green-300 flex items-center space-x-2 ${loadingVerify ? 'bg-yellow-500 animate-pulse' : 'bg-green-500 text-white'}`}
    >
      <FaCheckCircle />
      <span>{loadingVerify ? "Verifying..." : "Verify Hash"}</span>
    </button>
  </div>
);

export default ActionButtons;