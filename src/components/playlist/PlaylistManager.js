import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPlaylists, createPlaylist, deletePlaylist, updatePlaylist } from '../../services/api';
import '../../styles/PlaylistManager.css';

function PlaylistManager() {
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [editName, setEditName] = useState('');
  const queryClient = useQueryClient();

  const { data: playlists = [] } = useQuery({
    queryKey: ['playlists'],
    queryFn: fetchPlaylists
  });

  const createMutation = useMutation({
    mutationFn: createPlaylist,
    onSuccess: () => {
      setNewPlaylistName('');
      queryClient.invalidateQueries({ queryKey: ['playlists'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deletePlaylist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists'] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: updatePlaylist,
    onSuccess: () => {
      setEditingPlaylist(null);
      queryClient.invalidateQueries({ queryKey: ['playlists'] });
    }
  });

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createMutation.mutate({ name: newPlaylistName });
    }
  };

  const handleDeletePlaylist = (playlistId) => {
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      deleteMutation.mutate(playlistId);
    }
  };

  const startEditing = (playlist) => {
    setEditingPlaylist(playlist);
    setEditName(playlist.name);
  };

  const handleUpdatePlaylist = () => {
    if (editName.trim() && editingPlaylist) {
      updateMutation.mutate({
        id: editingPlaylist.id,
        name: editName
      });
    }
  };

  return (
    <div className="playlist-container">
      <div className="playlist-header">
        <h2 className="playlist-title">Your Playlists</h2>
      </div>

      <div className="create-playlist-form">
        <input
          type="text"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          placeholder="New playlist name"
          className="playlist-input"
        />
        <button
          onClick={handleCreatePlaylist}
          className="create-button"
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? 'Creating...' : 'Create Playlist'}
        </button>
      </div>

      {playlists.length > 0 ? (
        <div className="playlists-grid">
          {playlists.map(playlist => (
            <div key={playlist.id} className="playlist-card">
              {editingPlaylist?.id === playlist.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="edit-input"
                  />
                  <div className="edit-actions">
                    <button
                      onClick={handleUpdatePlaylist}
                      className="save-button"
                      disabled={updateMutation.isPending}
                    >
                      {updateMutation.isPending ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => setEditingPlaylist(null)}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="playlist-card-header">
                  <h3 className="playlist-name">{playlist.name}</h3>
                  <div className="playlist-actions">
                    <button 
                      className="action-button edit-button"
                      onClick={() => startEditing(playlist)}
                    >
                      Edit
                    </button>
                    <button 
                      className="action-button delete-button"
                      onClick={() => handleDeletePlaylist(playlist.id)}
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              )}
              <div className="playlist-info">
                <span className="playlist-count">
                  {playlist.podcasts?.length || 0} podcasts
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🎵</div>
          <p className="empty-text">No playlists yet. Create your first one!</p>
        </div>
      )}
    </div>
  );
}

export default PlaylistManager;