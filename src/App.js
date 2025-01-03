// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navigation from './components/shared/Navigation';
import PodcastList from './components/podcast/PodcastList';
import PodcastPreview from './components/podcast/PodcastPreview';
import UserPreferences from './components/user/UserPreferences';
import UserProfile from './components/user/UserProfile';
import PlaylistManager from './components/playlist/PlaylistManager';
import UploadPodcast from './components/podcast/UploadPodcast';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <PodcastList />
                </ProtectedRoute>
              } />
              <Route path="/podcast/:id" element={
                <ProtectedRoute>
                  <PodcastPreview />
                </ProtectedRoute>
              } />
              <Route path="/preferences" element={
                <ProtectedRoute>
                  <UserPreferences />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } />
              <Route path="/playlists" element={
                <ProtectedRoute>
                  <PlaylistManager />
                </ProtectedRoute>
              } />
              <Route path="/upload" element={
                <ProtectedRoute>
                  <UploadPodcast />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;