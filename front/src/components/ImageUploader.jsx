import React, {useState, useRef} from 'react'
import {Upload} from 'lucide-react'
import { toast } from 'react-toastify'

const ImageUploader = ({file, setFile}) => {
  const [preview, setPreview] = useState(null);
  const [drag, setDrag] = useState(false);

  const inputRef = useRef();

  // Handle file selection or drop
  const handleFiles = (files) => {
    if (files.length === 0) return;

    const selectedFile = files[0];
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Only Images can be uploaded.")
          setDrag(false);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(selectedFile);
    setFile(selectedFile);
    setDrag(false);
  };
  const handleInputChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  }

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(true);
  }

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
  }

  return (
    <div className="flex flex-col flex-1 w-100 min-h-60">
      <div 
      onDrop={handleDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={()=>{
        inputRef.current.click();
      }} className={`flex-1 ${drag? 'border-blue-400 bg-blue-100' : 'border-gray-300 bg-gray-100'} border-2 rounded h-40 flex flex-col justify-center active:bg-gray-200 items-center w-full cursor-pointer`}>
        <Upload className='mb-2'/>
        Click or Drag and Drop File
      </div>
      <div className="h-15 my-2 max-w-full">
        {preview && <div className='flex flex-row items-center space-x-3 min-w-0'><img src={preview} className="h-15 w-15 border border-gray-300 object-contain"/> <p className='break-all text-gray-600'>{file.name}</p></div>}
      </div>
          <input
          hidden
        type="file"
        accept="image/*"
        className=" block"
        ref={inputRef}
        onChange={handleInputChange}
        multiple={false}
      />
    </div>
  )
}

export default ImageUploader