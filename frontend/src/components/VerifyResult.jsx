import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const VerifyResult = ({ result, file }) => (
    result && file && (
        <div className={`p-4 rounded border-l-4 w-full 
      ${result.exists ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500"}`}>
            <p className="font-semibold flex items-center space-x-2">
                {result.exists ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
                <span>Verify File: {file.name}</span>
            </p>
            <p>Hash: <code className="break-all text-xs md:text-sm" data-tip="Unique fingerprint of the file">{result.hash}</code></p>
            <p className="flex items-center space-x-2">
                <span>Status:</span>
                {result.exists ? (
                    <>
                        <FaCheckCircle className="text-green-500" />
                        <span>File is valid & exists on blockchain</span>
                    </>
                ) : (
                    <>
                        <FaTimesCircle className="text-red-500" />
                        <span>File not found</span>
                    </>
                )}
            </p>
            <p className="text-sm text-gray-500">
                This confirms file integrity and authenticity. <span data-tip="Decentralized ledger for secure, immutable records">Blockchain</span> ensures immutability and security.
            </p>
        </div>
    )
);

export default VerifyResult;
