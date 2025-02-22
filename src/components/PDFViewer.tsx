import React, { useState, useRef } from 'react';
// import { FileUpload, UploadSimple } from 'lucide-react';

const FileUpload = () => {
  return (<span>FileUpload</span>)
}

const UploadSimple = () => {
  return (<span>UploadSimple</span>)
}

const PDFViewer = () => {

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [viewerUrl, setViewerUrl] = useState(null);
  const dropAreaRef = useRef(null);

  // Handle drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropAreaRef.current.classList.add('bg-blue-50');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropAreaRef.current.classList.remove('bg-blue-50');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropAreaRef.current.classList.remove('bg-blue-50');
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
        uploadFile(droppedFile);
      } else {
        alert('Please upload a PDF file');
      }
    }
  };

  // Handle manual file selection
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        uploadFile(selectedFile);
      } else {
        alert('Please upload a PDF file');
      }
    }
  };

  // Simulate file upload with progress
  const uploadFile = (file) => {
    setLoading(true);
    setProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          // Create object URL for the uploaded PDF
          const url = URL.createObjectURL(file);
          setViewerUrl(url);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {!viewerUrl && (
        <div 
          ref={dropAreaRef}
          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:bg-blue-50 transition-colors cursor-pointer"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <input 
            type="file" 
            id="fileInput" 
            className="hidden" 
            accept="application/pdf" 
            onChange={handleFileSelect} 
          />
          
          <FileUpload className="mx-auto h-12 w-12 text-gray-400" />
          
          <h3 className="mt-4 text-lg font-medium text-gray-700">Drag and drop your PDF here</h3>
          <p className="mt-2 text-sm text-gray-500">or click to browse files</p>
        </div>
      )}

      {loading && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Uploading PDF...</span>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {viewerUrl && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {file?.name || 'PDF Document'}
            </h2>
            <button 
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md flex items-center hover:bg-blue-200"
              onClick={() => {
                setFile(null);
                setViewerUrl(null);
                setProgress(0);
              }}
            >
              <UploadSimple className="mr-2 h-4 w-4" />
              Upload new PDF
            </button>
          </div>
          
          <div className="border rounded-lg overflow-hidden shadow-md h-screen max-h-screen">
            <iframe 
              src={viewerUrl} 
              className="w-full h-full" 
              title="PDF Viewer"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );

  // return (
  //   <div className="border border-gray-300 w-1/2 h-[80%]">
      
  //     <h1>PDF Viewer</h1>
  //   </div>
  // );

}

export default PDFViewer;