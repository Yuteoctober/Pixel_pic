import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import clsx from 'clsx';

const ImageUploader = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      readImage(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      readImage(file);
    }
  };

  const readImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => onImageUpload(e.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={clsx(
        "relative flex flex-col items-center justify-center w-full max-w-2xl h-64 border-4 border-dashed transition-all cursor-pointer font-press-start",
        isDragging 
          ? "border-pixel-accent bg-pixel-accent/10 scale-102" 
          : "border-pixel-muted hover:border-pixel-text bg-pixel-card",
        "mx-auto my-8 p-8 text-center"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      <div className="bg-pixel-dark p-4 rounded-none mb-4 shadow-pixel-sm border-2 border-pixel-muted">
        <Upload className={clsx("w-12 h-12 text-pixel-primary", isDragging && "animate-bounce")} />
      </div>
      
      <h3 className="text-sm md:text-base mb-2 text-pixel-text">
        DRAG & DROP IMAGE
      </h3>
      <p className="text-xs text-pixel-muted font-sans tracking-widest">
        OR CLICK TO BROWSE
      </p>

      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2 h-2 bg-pixel-text -ml-1 -mt-1" />
      <div className="absolute top-0 right-0 w-2 h-2 bg-pixel-text -mr-1 -mt-1" />
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-pixel-text -ml-1 -mb-1" />
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-pixel-text -mr-1 -mb-1" />
    </div>
  );
};

export default ImageUploader;
