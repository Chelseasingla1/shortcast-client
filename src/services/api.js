// src/services/api.js

export const fetchCategories = async () => {
    // Mock data for now - replace with actual API call
    return [
      { id: 1, name: 'Technology' },
      { id: 2, name: 'Business' },
      { id: 3, name: 'Education' },
      { id: 4, name: 'Entertainment' }
    ];
  };
  
  export const updatePreferences = async (categories) => {
    // Mock implementation - replace with actual API call
    console.log('Updating preferences:', categories);
    return { success: true };
  };
  
  export const fetchPodcasts = async (searchTerm = '') => {
    // Mock data - replace with actual API call
    const podcasts = [
      {
        id: 1,
        title: 'Tech Talk',
        description: 'Latest in technology',
        imageUrl: 'https://via.placeholder.com/150'
      },
      {
        id: 2,
        title: 'Business Daily',
        description: 'Business news and analysis',
        imageUrl: 'https://via.placeholder.com/150'
      }
    ];
  
    if (searchTerm) {
      return podcasts.filter(podcast => 
        podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        podcast.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    return podcasts;
  };
  
  export const fetchPodcastById = async (id) => {
    // Mock data - replace with actual API call
    return {
      id,
      title: 'Sample Podcast',
      description: 'This is a detailed description of the podcast...',
      imageUrl: 'https://via.placeholder.com/400',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Sample audio URL
      episodes: [
        { id: 1, title: 'Episode 1', duration: '45:00' },
        { id: 2, title: 'Episode 2', duration: '32:15' },
      ]
    };
  };
  
  // export const fetchPlaylists = async () => {
  //   // Mock data - replace with actual API call
  //   return [
  //     { id: 1, name: 'My Favorites' },
  //     { id: 2, name: 'Tech Podcasts' }
  //   ];
  //   const response = await fetch('http://localhost:3001/api/playlists');
  // if (!response.ok) {
  //   throw new Error('Failed to fetch playlists');
  // }
  // return response.json();
  // };
  
  // export const createPlaylist = async (playlistData) => {
  //   // Mock implementation - replace with actual API call
  //   console.log('Creating playlist:', playlistData);
  //   //r//eturn { id: Date.now(), ...playlistData };

  //   const response = await fetch('http://localhost:3001/api/playlists', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //    // body: JSON.stringify({ name })
  //   });
  //   if (!response.ok) {
  //     throw new Error('Failed to create playlist');
  //   }
  //   return response.json();
  // };
  
  export const updateUserProfile = async (profileData) => {
    // Mock implementation - replace with actual API call
    console.log('Updating profile:', profileData);
    return { success: true };
  };
  
  export const uploadPodcast = async (formData) => {
    // Mock implementation - replace with actual API call
    console.log('Uploading podcast:', formData);
    return { success: true };
  };

  
  export const fetchComments = async (podcastId) => {
    // Mock data - replace with actual API call
    return [
      { 
        id: 1, 
        text: 'Great episode!', 
        user: 'User1', 
        createdAt: new Date().toISOString() 
      },
      { 
        id: 2, 
        text: 'Very informative', 
        user: 'User2', 
        createdAt: new Date().toISOString() 
      }
    ];
  };
  
  export const addComment = async ({ podcastId, text }) => {
    // Mock implementation - replace with actual API call
    return {
      id: Date.now(),
      text,
      user: 'CurrentUser',
      createdAt: new Date().toISOString()
    };
  };
  
  export const ratePodcast = async ({ podcastId, rating }) => {
    // Mock implementation - replace with actual API call
    console.log('Rating podcast:', podcastId, rating);
    return { success: true };
  };
  
  export const searchPodcasts = async (query, filters = {}) => {
    // Mock implementation - replace with actual API call
    const allPodcasts = await fetchPodcasts();
    return allPodcasts.filter(podcast => 
      podcast.title.toLowerCase().includes(query.toLowerCase()) ||
      podcast.description.toLowerCase().includes(query.toLowerCase())
    );
  };
  
  export const fetchUserSubscriptions = async () => {
    // Mock implementation - replace with actual API call
    return [
      {
        id: 1,
        title: 'Subscribed Podcast 1',
        lastEpisode: 'Latest Episode Title',
        imageUrl: 'https://via.placeholder.com/150'
      },
      // Add more subscribed podcasts...
    ];
  };
  
  export const subscribeToPodcast = async (podcastId) => {
    // Mock implementation - replace with actual API call
    console.log('Subscribing to podcast:', podcastId);
    return { success: true };
  };
  
  export const unsubscribeFromPodcast = async (podcastId) => {
    // Mock implementation - replace with actual API call
    console.log('Unsubscribing from podcast:', podcastId);
    return { success: true };
  };

 






// src/services/api.js

// Mock data to simulate database
let mockPlaylists = [
  {
    id: 1,
    name: 'Favorite Tech Talks',
    podcasts: [
      { id: 1, title: 'Understanding React' },
      { id: 2, title: 'JavaScript Deep Dive' }
    ]
  },
  {
    id: 2,
    name: 'Learning Podcasts',
    podcasts: [
      { id: 3, title: 'History of Computing' }
    ]
  }
];

// Fetch all playlists


// Add a podcast to a playlist
export const addPodcastToPlaylist = async ({ playlistId, podcast }) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  mockPlaylists = mockPlaylists.map(playlist =>
    playlist.id === playlistId
      ? { ...playlist, podcasts: [...playlist.podcasts, podcast] }
      : playlist
  );
  return mockPlaylists.find(playlist => playlist.id === playlistId);
};

// Remove a podcast from a playlist
export const removePodcastFromPlaylist = async ({ playlistId, podcastId }) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  mockPlaylists = mockPlaylists.map(playlist =>
    playlist.id === playlistId
      ? {
          ...playlist,
          podcasts: playlist.podcasts.filter(p => p.id !== podcastId)
        }
      : playlist
  );
  return mockPlaylists.find(playlist => playlist.id === playlistId);
};

// src/services/api.js

const API_BASE_URL = 'http://localhost:3001/api/v1';

// Function to handle fetch errors
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
};

// Playlist functions
export const fetchPlaylists = async () => {
  const response = await fetch(`${API_BASE_URL}/playlists`);
  return handleResponse(response);
};

export const createPlaylist = async ({ name }) => {
  const response = await fetch(`${API_BASE_URL}/playlists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name })
  });
  return handleResponse(response);
};

export const updatePlaylist = async ({ id, name }) => {
  const response = await fetch(`${API_BASE_URL}/playlists/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name })
  });
  return handleResponse(response);
};

export const deletePlaylist = async (id) => {
  const response = await fetch(`${API_BASE_URL}/playlists/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete playlist');
  }
};

// Episodes functions
export const fetchEpisodes = async () => {
  const response = await fetch(`${API_BASE_URL}/episodes`);
  return handleResponse(response);
};

export const addEpisodeToPlaylist = async (playlistId, episodeId) => {
  const response = await fetch(`${API_BASE_URL}/playlists/${playlistId}/episodes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ episodeId })
  });
  return handleResponse(response);
};

// Favorites functions
export const addToFavorites = async (type, itemId) => {
  const response = await fetch(`${API_BASE_URL}/favourites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ type, itemId })
  });
  return handleResponse(response);
};

export const removeFromFavorites = async (type, itemId) => {
  const response = await fetch(`${API_BASE_URL}/favourites`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ type, itemId })
  });
  if (!response.ok) {
    throw new Error('Failed to remove from favorites');
  }
};