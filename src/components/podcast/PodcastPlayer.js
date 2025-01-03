import React, { useRef, useState, useEffect } from 'react';
import { Howl } from 'howler';
import '../../styles/PodcastPlayer.css';

function PodcastPlayer({ audioUrl, title, author, imageUrl }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const soundRef = useRef(null);
  const animationRef = useRef(null);

  const updateProgress = React.useCallback(() => {
    if (soundRef.current) {
      const seek = soundRef.current.seek() || 0;
      const duration = soundRef.current.duration();
      setProgress((seek / duration) * 100);
      setCurrentTime(seek);
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  }, []);

  useEffect(() => {
    if (audioUrl) {
      soundRef.current = new Howl({
        src: [audioUrl],
        html5: true,
        volume: volume,
        rate: speed,
        onload: () => {
          const duration = soundRef.current.duration();
          setTotalDuration(duration);
        },
        onplay: () => {
          setPlaying(true);
          animationRef.current = requestAnimationFrame(updateProgress);
        },
        onpause: () => {
          setPlaying(false);
          cancelAnimationFrame(animationRef.current);
        },
        onend: () => {
          setPlaying(false);
          cancelAnimationFrame(animationRef.current);
        }
      });

      return () => {
        if (soundRef.current) {
          soundRef.current.unload();
        }
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [audioUrl, volume, speed, updateProgress]);

  const togglePlay = () => {
    if (!soundRef.current) return;
    if (playing) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
  };

  const handleSeek = (e) => {
    if (!soundRef.current) return;
    const duration = soundRef.current.duration();
    const seekTime = (e.target.value * duration) / 100;
    soundRef.current.seek(seekTime);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="podcast-player">
      <div className="player-container">
        <div className="player-content">
          {/* Podcast Info */}
          <div className="podcast-info">
            <img 
              src={imageUrl || 'https://via.placeholder.com/48'} 
              alt={title}
              className="podcast-image"
            />
            <div className="podcast-details">
              <h4 className="podcast-title">{title}</h4>
              <p className="podcast-author">{author}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="player-controls">
            {/* Main Controls */}
            <div className="main-controls">
              <button
                onClick={() => {
                  if (soundRef.current) {
                    soundRef.current.seek(currentTime - 10);
                  }
                }}
                className="control-button"
              >
                -10s
              </button>
              
              <button
                onClick={togglePlay}
                className="play-button"
              >
                {playing ? '⏸️' : '▶️'}
              </button>

              <button
                onClick={() => {
                  if (soundRef.current) {
                    soundRef.current.seek(currentTime + 10);
                  }
                }}
                className="control-button"
              >
                +10s
              </button>
            </div>

            {/* Progress Bar */}
            <div className="progress-container">
              <span className="time-display">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="progress-bar"
              />
              <span className="time-display">
                {formatTime(totalDuration)}
              </span>
            </div>
          </div>

          {/* Additional Controls */}
          <div className="additional-controls">
            <select
              value={speed}
              onChange={(e) => {
                const newSpeed = parseFloat(e.target.value);
                setSpeed(newSpeed);
                if (soundRef.current) {
                  soundRef.current.rate(newSpeed);
                }
              }}
              className="speed-select"
            >
              {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((rate) => (
                <option key={rate} value={rate}>
                  {rate}x
                </option>
              ))}
            </select>

            <div className="volume-container">
              <button
                onClick={() => {
                  setIsMuted(!isMuted);
                  if (soundRef.current) {
                    soundRef.current.mute(!isMuted);
                  }
                }}
                className="control-button"
              >
                {isMuted ? '🔇' : '🔊'}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const newVolume = parseFloat(e.target.value);
                  setVolume(newVolume);
                  setIsMuted(newVolume === 0);
                  if (soundRef.current) {
                    soundRef.current.volume(newVolume);
                  }
                }}
                className="volume-slider"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PodcastPlayer;