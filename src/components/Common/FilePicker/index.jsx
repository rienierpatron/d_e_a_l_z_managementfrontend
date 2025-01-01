/**
 * External dependencies
 */
import React, { useRef } from "react";

const FilePicker = ({ onFileSelect, children, className }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleChooseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={className}>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <div onClick={handleChooseClick} className="cursor-pointer">
        {children || <button>Choose File</button>}
      </div>
    </div>
  );
};

export default FilePicker;
