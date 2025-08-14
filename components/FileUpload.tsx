import React, { useState, useEffect } from 'react';
import { Image, X } from './Icons';

// Upload icon component
const Upload = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

interface FileUploadProps {
  label: string;
  accept: string;
  onFileSelect: (file: File | null) => void;
  preview?: string;
  maxSize?: number; // in MB
  multiple?: boolean;
  required?: boolean;
  className?: string;
}

export default function FileUpload({ 
  label, 
  accept, 
  onFileSelect, 
  preview, 
  maxSize = 5,
  multiple = false,
  required = false,
  className = ""
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>(preview || '');
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string>('');

  // Update preview when prop changes
  useEffect(() => {
    setFilePreview(preview || '');
  }, [preview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    validateAndSelectFile(file);
  };

  const validateAndSelectFile = (file: File | null) => {
    setError('');
    
    if (!file) {
      setSelectedFile(null);
      setFilePreview('');
      onFileSelect(null);
      return;
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Check file type
    const acceptedTypes = accept.split(',').map(type => type.trim());
    const fileType = file.type;
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    const isValidType = acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return type === fileExtension;
      }
      return fileType.startsWith(type.replace('*', ''));
    });

    if (!isValidType) {
      setError(`Invalid file type. Accepted types: ${accept}`);
      return;
    }

    setSelectedFile(file);
    
    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview('');
    }

    onFileSelect(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0] || null;
    validateAndSelectFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview('');
    onFileSelect(null);
    setError('');
  };

  const isImage = accept.includes('image');
  const isPDF = accept.includes('pdf');

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : error
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          multiple={multiple}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {filePreview || selectedFile ? (
          <div className="space-y-4">
            {filePreview && isImage ? (
              <div className="relative">
                <img
                  src={filePreview}
                  alt="Preview"
                  className="mx-auto max-w-full h-32 object-contain rounded-lg border shadow-sm"
                />
              </div>
            ) : selectedFile ? (
              <div className="mx-auto w-20 h-20 bg-blue-100 rounded-xl flex items-center justify-center">
                {isPDF ? (
                  <span className="text-blue-600 font-semibold text-sm">PDF</span>
                ) : (
                  <span className="text-blue-600 font-semibold text-sm">FILE</span>
                )}
              </div>
            ) : (
              <div className="mx-auto w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-sm">FILE</span>
              </div>
            )}
            
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-gray-900">
                {selectedFile ? selectedFile.name : 'File uploaded'}
              </p>
              {selectedFile && (
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              )}
              <button
                type="button"
                onClick={removeFile}
                className="inline-flex items-center space-x-1 text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Remove file</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <Upload className="mx-auto w-12 h-12 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                  Click to upload
                </span>
                {' '}or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {accept} (max {maxSize}MB)
              </p>
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
