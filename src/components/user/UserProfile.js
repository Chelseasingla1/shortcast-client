// src/components/user/UserProfile.js
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import '../../styles/UserProfile.css';

const getCurrentUser = () => {
  // Get user from localStorage
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : {
    name: 'Guest User',
    email: 'guest@example.com',
    picture: 'https://via.placeholder.com/128'
  };
};

const updateUserProfile = async (profileData) => {
  // Mock API call - replace with real API
  console.log('Updating profile:', profileData);
  // Update localStorage
  const currentUser = getCurrentUser();
  const updatedUser = { ...currentUser, ...profileData };
  localStorage.setItem('user', JSON.stringify(updatedUser));
  return updatedUser;
};

function UserProfile() {
  const currentUser = getCurrentUser();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: currentUser.name || '',
    bio: currentUser.bio || '',
    website: currentUser.website || '',
  });

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      setEditing(false);
      alert('Profile updated successfully!');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={currentUser.picture || 'https://via.placeholder.com/128'}
            alt={currentUser.name}
            className="profile-avatar"
          />
          <div className="profile-info">
            <h2 className="profile-name">{currentUser.name}</h2>
            <p className="profile-email">{currentUser.email}</p>
          </div>
        </div>

        {editing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label className="form-label">Display Name</label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="button-group">
              <button
                type="submit"
                className="button primary-button"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="button secondary-button"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-content">
            <div className="content-section">
              <h3 className="section-title">About</h3>
              <p className="section-text">{formData.bio || 'No bio added yet.'}</p>
            </div>
            {formData.website && (
              <div className="content-section">
                <h3 className="section-title">Website</h3>
                
                  href={formData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="website-link"
                <a>
                  {formData.website}
                </a>
              </div>
            )}
            <div className="button-group">
              <button
                onClick={() => setEditing(true)}
                className="button secondary-button"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;