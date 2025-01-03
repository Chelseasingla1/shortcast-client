// frontend/src/components/playlist/PlayQueue.js
import React from 'react';
import { useQueue } from '../../context/QueueContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function PlayQueue() {
  const { queue, removeFromQueue } = useQueue();

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(queue);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setQueue(items);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4">Play Queue</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="queue">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {queue.map((podcast, index) => (
                <Draggable
                  key={podcast.id}
                  draggableId={podcast.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-500">{index + 1}</span>
                        <div>
                          <h3 className="font-medium">{podcast.title}</h3>
                          <p className="text-sm text-gray-500">{podcast.author}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromQueue(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default PlayQueue;

// frontend/src/services/api.js
export const downloadPodcast = async (podcastId) => {
  try {
    const response = await fetch(`${API_URL}/api/podcasts/${podcastId}/download`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    
    if (!response.ok) throw new Error('Download failed');
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'podcast.mp3'; // You can get the actual filename from response headers
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Download error:', error);
    throw error;
  }
};