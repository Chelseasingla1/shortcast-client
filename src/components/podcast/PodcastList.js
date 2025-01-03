import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPodcasts } from '../../services/api';

import '../../styles/PodcastList.css';
function PodcastList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const { data: podcasts = [] } = useQuery({
    queryKey: ['podcasts', searchTerm],
    queryFn: () => fetchPodcasts(searchTerm)
  });

  const categories = ['All', 'Technology', 'Business', 'Education', 'Entertainment'];

  return (
    <div className="podcast-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Discover Amazing Podcasts</h1>
        <p className="hero-subtitle">
          Listen to thousands of insightful conversations from leading experts across various fields.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter-container">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search podcasts..."
            className="search-input"
          />
        </div>
        <div className="categories-container">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category.toLowerCase())}
              className={`category-button ${
                selectedCategory === category.toLowerCase() ? 'active' : ''
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Podcast Grid */}
      <div className="podcast-grid">
        {podcasts.map(podcast => (
          <div key={podcast.id} className="podcast-card">
            <div className="podcast-image-container">
              <img 
                src={podcast.imageUrl}
                alt={podcast.title}
                className="podcast-image"
              />
            </div>
            <div className="podcast-content">
              <div className="podcast-meta">
                <span className="podcast-category">
                  {podcast.category || 'General'}
                </span>
                <span className="podcast-duration">
                  {podcast.duration || '45 mins'}
                </span>
              </div>
              <h3 className="podcast-title">{podcast.title}</h3>
              <p className="podcast-description">{podcast.description}</p>
              <div className="podcast-footer">
                <div className="author-info">
                  <img 
                    src={podcast.authorImage || 'https://via.placeholder.com/40'}
                    alt=""
                    className="author-image"
                  />
                  <span className="author-name">{podcast.author || 'Anonymous'}</span>
                </div>
                <a 
                  href={`/podcast/${podcast.id}`}
                  className="listen-button"
                >
                  Listen Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {podcasts.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🎧</div>
          <h3 className="empty-state-title">No podcasts found</h3>
          <p className="empty-state-message">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

export default PodcastList;