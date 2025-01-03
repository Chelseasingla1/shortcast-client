import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/UploadPodcast.css';

function UploadPodcast() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('audio', file);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);

      await axios.post('http://localhost:5000/api/podcasts/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        }
      });

      setFile(null);
      setTitle('');
      setDescription('');
      setCategory('');
      setUploadProgress(0);
      alert('Podcast uploaded successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile.size > 100 * 1024 * 1024) {
      setError('File size too large. Maximum size is 100MB');
      return;
    }

    if (!selectedFile.type.startsWith('audio/')) {
      setError('Invalid file type. Please select an audio file');
      return;
    }

    setFile(selectedFile);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
          rows={4}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-input"
          required
        >
          <option value="">Select a category</option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
          <option value="Education">Education</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Audio File</label>
        <div className="file-input-container">
          <label className="file-input-label">
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileSelect}
              className="hidden"
              required
            />
            <span>{file ? file.name : 'Click to select audio file'}</span>
          </label>
          <p className="file-info">
            Maximum file size: 100MB. Supported formats: MP3, WAV, AAC
          </p>
        </div>
      </div>

      {uploadProgress > 0 && (
        <div className="progress-container">
          <div 
            className="progress-bar"
            style={{ width: `${uploadProgress}%` }}
          />
          <div className="progress-text">
            {uploadProgress}% uploaded
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isUploading}
        className="upload-button"
      >
        {isUploading ? 'Uploading...' : 'Upload Podcast'}
      </button>
    </form>
  );
}

export default UploadPodcast;