import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPodcastById } from '../../services/api';
import PodcastPlayer from './PodcastPlayer';
import '../../styles/PodcastPreview.css';  // Add this import

function PodcastPreview() {
  const { id } = useParams();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const { data: podcast } = useQuery({
    queryKey: ['podcast', id],
    queryFn: () => fetchPodcastById(id)
  });

  if (!podcast) {
    return <div className="loading-container">Loading...</div>;
  }

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  const handleShare = () => {
    setShowShare(true);
  };

  return (
    <div className="podcast-container">
      <div className="podcast-header">
        <img
          src={podcast.imageUrl}
          alt={podcast.title}
          className="podcast-image"
        />
        <div className="podcast-info">
          <h1 className="podcast-title">{podcast.title}</h1>
          <p className="podcast-description">{podcast.description}</p>
          
          <div className="action-buttons">
            <button
              onClick={handleSubscribe}
              className={`subscribe-button ${
                isSubscribed ? 'subscribed' : 'not-subscribed'
              }`}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
            <button
              onClick={handleShare}
              className="share-button"
            >
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Episodes List */}
      <div className="episodes-section">
        <h2 className="episodes-title">Episodes</h2>
        <div className="episodes-list">
          {podcast.episodes.map((episode) => (
            <div
              key={episode.id}
              className="episode-card"
            >
              <div className="episode-info">
                <h3 className="episode-title">{episode.title}</h3>
                <span className="episode-duration">{episode.duration}</span>
              </div>
              <button className="play-button">
                Play
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Share Modal */}
      {showShare && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Share Podcast</h3>
            <div className="share-buttons">
              <button className="share-social-button share-twitter">Twitter</button>
              <button className="share-social-button share-facebook">Facebook</button>
              <button className="share-social-button share-whatsapp">WhatsApp</button>
            </div>
            <button
              onClick={() => setShowShare(false)}
              className="close-button"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Audio Player */}
      <PodcastPlayer audioUrl={podcast.audioUrl} title={podcast.title} />
    </div>
  );
}

export default PodcastPreview;