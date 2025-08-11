import React, {useState, useRef} from 'react'

const ImageUploader = ({file, setFile}) => {

  const inputRef = useRef();

  // Handle file selection or drop
  const handleFiles = (files) => {
    if (files.length === 0) return;

    const selectedFile = files[0];
    if (!selectedFile.type.startsWith("image/")) {
      return;
    }
    setFile(selectedFile);
  };
  const handleInputChange = (e) => {
    handleFiles(e.target.files);
  };

  return (
    <div>
          <input
        type="file"
        accept="image/*"
        className=" block
        w-full
        text-sm
        text-gray-500
        file:mr-4
        file:py-2
        file:px-4
        file:rounded-md
        file:border-0
        file:text-sm
        file:font-semibold
        file:bg-blue-600
        file:text-white
        hover:file:bg-blue-700
        cursor-pointer
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:ring-offset-2"
        ref={inputRef}
        onChange={handleInputChange}
        multiple={false}
      />
    </div>
  )
}

export default ImageUploader