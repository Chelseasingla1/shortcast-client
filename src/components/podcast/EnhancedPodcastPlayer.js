// frontend/src/components/podcast/EnhancedPodcastPlayer.js
import React, { useRef, useState, useEffect } from 'react';
import { Howl } from 'howler';

function EnhancedPodcastPlayer({ audioUrl, title }) {
  const [playing, setPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const soundRef = useRef(null);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (audioUrl) {
      soundRef.current = new Howl({
        src: [audioUrl],
        html5: true,
        rate: playbackRate,
        onend: () => {
          playNext();
        }
      });
    }
  }, [audioUrl, playbackRate]);

  const playNext = () => {
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(prev => prev + 1);
      // Load and play next podcast in queue
    }
  };

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
    if (soundRef.current) {
      soundRef.current.rate(rate);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const addToQueue = (podcast) => {
    setQueue(prev => [...prev, podcast]);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
      <div className="max-w-4xl mx-auto">
        {/* Playback Speed Control */}
        <div className="mb-2 flex justify-end space-x-2">
          {[0.5, 1, 1.5, 2].map(rate => (
            <button
              key={rate}
              onClick={() => handlePlaybackRateChange(rate)}
              className={`px-2 py-1 rounded ${
                playbackRate === rate ? 'bg-indigo-600 text-white' : 'bg-gray-200'
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>

        {/* Player Controls */}
        <div className="flex items-center space-x-4">
          {/* ... existing player controls ... */}

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Download
          </button>
        </div>

        {/* Queue Display */}
        <div className="mt-2">
          <h4 className="text-sm font-medium">Up Next:</h4>
          <div className="text-sm text-gray-600">
            {queue.slice(currentIndex + 1).map((item, index) => (
            // frontend/src/components/podcast/EnhancedPodcastPlayer.js (continued)
            <div key={index} className="flex items-center justify-between py-1">
            <span className="truncate">{item.title}</span>
            <button 
              onClick={() => setCurrentIndex(currentIndex + index + 1)}
              className="text-indigo-600 hover:text-indigo-800"
            >
              Play
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
);
}

export default EnhancedPodcastPlayer;

