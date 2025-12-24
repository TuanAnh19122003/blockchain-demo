import React from 'react';

const FileInput = ({ onChange }) => (
  <input
    type="file"
    onChange={onChange}
    className="block w-full text-sm md:text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 md:file:py-2 md:file:px-4
               file:rounded file:border-0 file:text-sm md:file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
  />
);

export default FileInput;