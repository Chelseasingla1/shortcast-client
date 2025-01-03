// frontend/src/context/QueueContext.js
import React, { createContext, useContext, useState } from 'react';

const QueueContext = createContext();

export function QueueProvider({ children }) {
const [queue, setQueue] = useState([]);
const [currentTrack, setCurrentTrack] = useState(null);

const addToQueue = (podcast) => {
setQueue(prev => [...prev, podcast]);
};

const removeFromQueue = (index) => {
setQueue(prev => prev.filter((_, i) => i !== index));
};

const clearQueue = () => {
setQueue([]);
};

const playNext = () => {
if (queue.length > 0) {
  setCurrentTrack(queue[0]);
  setQueue(prev => prev.slice(1));
}
};

return (
<QueueContext.Provider value={{
  queue,
  currentTrack,
  addToQueue,
  removeFromQueue,
  clearQueue,
  playNext
}}>
  {children}
</QueueContext.Provider>
);
}

export const useQueue = () => useContext(QueueContext);