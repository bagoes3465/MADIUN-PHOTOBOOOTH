import React, { createContext, useContext, useState, useEffect } from 'react';

const SessionContext = createContext();

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return context;
};

// Generate unique session ID
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const SessionProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(() => {
    // Get or create session ID
    const saved = localStorage.getItem('sessionId');
    return saved || generateSessionId();
  });

  const [photos, setPhotos] = useState(() => {
    // Load saved photos for this session
    const saved = localStorage.getItem(`photos_${sessionId}`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Save session ID
    localStorage.setItem('sessionId', sessionId);
  }, [sessionId]);

  useEffect(() => {
    // Save photos for this session
    localStorage.setItem(`photos_${sessionId}`, JSON.stringify(photos));
  }, [photos, sessionId]);

  const addPhoto = (photo) => {
    const newPhoto = {
      id: `photo_${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...photo
    };
    setPhotos(prev => [newPhoto, ...prev]);
    return newPhoto;
  };

  const deletePhoto = (photoId) => {
    setPhotos(prev => prev.filter(p => p.id !== photoId));
  };

  const clearPhotos = () => {
    setPhotos([]);
  };

  const resetSession = () => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    setPhotos([]);
  };

  const value = {
    sessionId,
    photos,
    addPhoto,
    deletePhoto,
    clearPhotos,
    resetSession
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};