import { useState, useRef } from 'react';
import { FaFileAudio, FaFileImage, FaFileVideo, FaFilePdf, FaFileAlt, FaPlus, FaUpload, FaTrashAlt, FaTimes } from 'react-icons/fa';
import axios from 'axios';

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const inputRef = useRef(null);

  function handleFileSelect(e) {
    if (!e.target.files?.length) {
      return;
    }

    const newFiles = Array.from(e.target.files).map((file) => ({
      file,
      progress: 0,
      uploaded: false,
      id: file.name,
    }));

    setFiles([...files, ...newFiles]);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  async function handleUpload() {
    if (files.length === 0 || uploading) {
      return;
    }

    setUploading(true);

    const uploadPromises = files.map(async (fileWithProgress) => {
      const formData = new FormData();
      formData.append('file', fileWithProgress.file);

      try {
        await axios.post('https://dummyjson.com/products/add', formData, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setFiles((prevFiles) =>
              prevFiles.map((file) =>
                file.id === fileWithProgress.id ? { ...file, progress } : file
              )
            );
          },
        });

        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.id === fileWithProgress.id
              ? { ...file, uploaded: true }
              : file
          )
        );
      } catch (error) {
        console.error(error);
      }
    });

    await Promise.all(uploadPromises);

    setUploading(false);
  }

  function removeFile(id) {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  }

  function handleClear() {
    setFiles([]);
  }

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex gap-3">
        <FileInput
          inputRef={inputRef}
          disabled={uploading}
          onFileSelect={handleFileSelect}
        />
        <ActionButtons
          disabled={files.length === 0 || uploading}
          onUpload={handleUpload}
          onClear={handleClear}
        />
      </div>
      <FileList files={files} onRemove={removeFile} uploading={uploading} />
    </div>
  );
}

function FileInput({ inputRef, disabled, onFileSelect }) {
  return (
    <>
      <input
        type="file"
        ref={inputRef}
        onChange={onFileSelect}
        multiple
        className="hidden"
        id="file-upload"
        disabled={disabled}
      />
      <label
        htmlFor="file-upload"
        className="flex cursor-pointer items-center gap-2 rounded-md bg-gray-700 px-6 py-2 hover:opacity-90"
      >
        <FaPlus size={18} />
        Select Files
      </label>
    </>
  );
}

function ActionButtons({ onUpload, onClear, disabled }) {
  return (
    <>
      <button
        onClick={onUpload}
        disabled={disabled}
        className="flex items-center gap-2"
      >
        <FaUpload size={18} />
        Upload
      </button>
      <button
        onClick={onClear}
        className="flex items-center gap-2"
        disabled={disabled}
      >
        <FaTrashAlt size={18} />
        Clear All
      </button>
    </>
  );
}

export default FileUpload;


function FileList({ files, onRemove, uploading }) {
  if (files.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Files:</h3>
      <div className="space-y-2">
        {files.map((file) => (
          <FileItem
            key={file.id}
            file={file}
            onRemove={onRemove}
            uploading={uploading}
          />
        ))}
      </div>
    </div>
  );
}

function FileItem({ file, onRemove, uploading }) {
  const Icon = getFileIcon(file.file.type);

  return (
    <div className="space-y-2 rounded-md bg-gray-700 p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Icon size={40} className="text-neutral-400" />
          <div className="flex flex-col">
            <span className="font-medium">{file.file.name}</span>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{formatFileSize(file.file.size)}</span>
              <span>•</span>
              <span>{file.file.type || 'Unknown type'}</span>
            </div>
          </div>
        </div>
        {!uploading && (
          <button onClick={() => onRemove(file.id)} className="bg-none p-0">
            <FaTimes size={16} className="text-white" />
          </button>
        )}
      </div>
      <div className="text-right text-xs">
        {file.uploaded ? 'Completed' : `${Math.round(file.progress)}%`}
      </div>
      <ProgressBar progress={file.progress} />
    </div>
  );
}

function ProgressBar({ progress }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
      <div
        className="h-full bg-neutral-300 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

const getFileIcon = (mimeType) => {
  if (mimeType.startsWith('image/')) return FaFileImage;
  if (mimeType.startsWith('video/')) return FaFileVideo;
  if (mimeType.startsWith('audio/')) return FaFileAudio;
  if (mimeType === 'application/pdf') return FaFilePdf;
  return FaFileAlt;
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};
