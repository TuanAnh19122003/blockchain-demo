import React from 'react';
import { FaFilePdf, FaCheckCircle } from 'react-icons/fa';

const UploadResult = ({ result, file }) => (
    result && file && (
        <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded w-full">
            <p className="font-semibold flex items-center space-x-2">
                <FaFilePdf />
                <span>File Uploaded: {file.name}</span>
            </p>
            <p>Hash: <code className="break-all text-xs md:text-sm" data-tip="Unique fingerprint of the file">{result.hash}</code></p>
            <p className="text-blue-700 font-semibold">{result.message}</p>
            <p className="text-sm text-gray-500 flex items-center space-x-2">
                <FaCheckCircle className="text-green-500" />
                <span>This hash is stored on <span data-tip="Decentralized ledger for secure, immutable records">blockchain</span>, immutable & verifiable</span>
            </p>
        </div>
    )
);

export default UploadResult;
