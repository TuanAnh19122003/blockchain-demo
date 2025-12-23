import React, { useState } from "react";
import axios from "axios";
import { FiLink, FiClock, FiBarChart2, FiFolder, FiSettings, FiClipboard, FiFileText } from "react-icons/fi";
import FileInput from "./components/FileInput";
import ActionButtons from "./components/ActionButtons";
import UploadResult from "./components/UploadResult";
import VerifyResult from "./components/VerifyResult";
import "./index.css"; // TailwindCSS

export default function App() {
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [verifyResult, setVerifyResult] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ uploads: 0, verifications: 0, successes: 0 });

  // Chọn file
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadResult(null);
    setVerifyResult(null);
  };

  // Upload & store hash
  const handleUpload = async () => {
    if (!file) return alert("Select a file first!");
    setLoadingUpload(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData);
      // Simulate delay for demo
      setTimeout(() => {
        setUploadResult(res.data);
        setHistory(prev => [...prev, { type: 'upload', file: file.name, timestamp: new Date() }]);
        setStats(prev => ({ ...prev, uploads: prev.uploads + 1 }));
        setLoadingUpload(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        alert("Upload failed!");
        setLoadingUpload(false);
      }, 3000);
    }
  };

  // Verify hash
  const handleVerify = async () => {
    if (!file) return alert("Select a file first!");
    setLoadingVerify(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/verify", formData);
      // Simulate delay for demo
      setTimeout(() => {
        setVerifyResult(res.data);
        setHistory(prev => [...prev, { type: 'verify', file: file.name, success: res.data.exists, timestamp: new Date() }]);
        setStats(prev => ({ ...prev, verifications: prev.verifications + 1, successes: prev.successes + (res.data.exists ? 1 : 0) }));
        setLoadingVerify(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        alert("Verification failed!");
        setLoadingVerify(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2 flex items-center justify-center space-x-2">
            <FiLink className="text-4xl" />
            <span>Blockchain File Verification</span>
          </h1>
          <p className="text-lg text-gray-600">Secure, Immutable, Decentralized</p>
        </header>

        {/* Timeline */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center space-x-2">
            <FiClock className="text-xl" />
            <span>Process Timeline</span>
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-colors ${file ? 'bg-green-500' : 'bg-gray-300'}`}>1</div>
              <p className="mt-2 text-sm">Select File</p>
            </div>
            <div className={`flex-1 h-1 mx-4 transition-colors ${uploadResult ? 'bg-green-400' : 'bg-gray-300'}`}></div>
            <div className="flex flex-col items-center text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-colors ${uploadResult ? 'bg-green-500' : loadingUpload ? 'bg-yellow-500 animate-pulse' : 'bg-gray-300'}`}>2</div>
              <p className="mt-2 text-sm">Upload</p>
            </div>
            <div className={`flex-1 h-1 mx-4 transition-colors ${verifyResult ? 'bg-green-400' : 'bg-gray-300'}`}></div>
            <div className="flex flex-col items-center text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-colors ${verifyResult ? 'bg-green-500' : loadingVerify ? 'bg-yellow-500 animate-pulse' : 'bg-gray-300'}`}>3</div>
              <p className="mt-2 text-sm">Verify</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center space-x-2">
            <FiBarChart2 className="text-xl" />
            <span>Statistics</span>
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.uploads}</div>
              <div className="text-sm text-gray-600">Uploads</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.verifications}</div>
              <div className="text-sm text-gray-600">Verifications</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{stats.successes}</div>
              <div className="text-sm text-gray-600">Successes</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center space-x-2">
                <FiFolder className="text-xl" />
                <span>File Input</span>
              </h3>
              <FileInput onChange={handleFileChange} />
              {file && <p className="mt-2 text-sm text-gray-600">Selected: {file.name}</p>}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center space-x-2">
                <FiSettings className="text-xl" />
                <span>Actions</span>
              </h3>
              <ActionButtons
                onUpload={handleUpload}
                onVerify={handleVerify}
                loadingUpload={loadingUpload}
                loadingVerify={loadingVerify}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center space-x-2">
                <FiClipboard className="text-xl" />
                <span>Results</span>
              </h3>
              <div className="space-y-4">
                <UploadResult result={uploadResult} file={file} />
                <VerifyResult result={verifyResult} file={file} />
              </div>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center space-x-2">
            <FiFileText className="text-xl" />
            <span>History</span>
          </h3>
          <div className="max-h-40 overflow-y-auto">
            {history.length === 0 ? (
              <p className="text-gray-500">No actions yet.</p>
            ) : (
              <div className="space-y-2">
                {history.slice(-10).reverse().map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      <span className={`w-3 h-3 rounded-full ${item.type === 'upload' ? 'bg-blue-500' : item.success ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span className="text-sm">{item.type === 'upload' ? 'Uploaded' : 'Verified'} {item.file}</span>
                    </div>
                    <span className="text-xs text-gray-500">{item.timestamp.toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
