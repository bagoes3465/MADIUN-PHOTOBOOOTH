import React, { createContext, useContext, useState, useEffect } from 'react';

const PhotoContext = createContext();

export const usePhoto = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhoto must be used within PhotoProvider');
  }
  return context;
};

export const PhotoProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [editHistory, setEditHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load photos from localStorage on mount
  useEffect(() => {
    const savedPhotos = localStorage.getItem('photobooth_photos');
    if (savedPhotos) {
      try {
        setPhotos(JSON.parse(savedPhotos));
      } catch (error) {
        console.error('Error loading photos:', error);
      }
    }
  }, []);

  // Save photos to localStorage whenever they change
  useEffect(() => {
    if (photos.length > 0) {
      localStorage.setItem('photobooth_photos', JSON.stringify(photos));
    }
  }, [photos]);

  // Add new photo
  const addPhoto = (photoData) => {
    const newPhoto = {
      id: Date.now().toString(),
      data: photoData,
      timestamp: new Date().toISOString(),
      filter: selectedFilter,
      frame: selectedFrame,
      edited: false
    };
    setPhotos(prev => [newPhoto, ...prev]);
    setCurrentPhoto(newPhoto);
    return newPhoto;
  };

  // Update photo
  const updatePhoto = (photoId, updates) => {
    setPhotos(prev =>
      prev.map(photo =>
        photo.id === photoId
          ? { ...photo, ...updates, edited: true }
          : photo
      )
    );
    if (currentPhoto?.id === photoId) {
      setCurrentPhoto(prev => ({ ...prev, ...updates }));
    }
  };

  // Delete photo
  const deletePhoto = (photoId) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
    if (currentPhoto?.id === photoId) {
      setCurrentPhoto(null);
    }
  };

  // Clear all photos
  const clearAllPhotos = () => {
    setPhotos([]);
    setCurrentPhoto(null);
    localStorage.removeItem('photobooth_photos');
  };

  // Get photo by ID
  const getPhotoById = (photoId) => {
    return photos.find(photo => photo.id === photoId);
  };

  // Apply filter to current photo
  const applyFilter = (filterName) => {
    setSelectedFilter(filterName);
    if (currentPhoto) {
      updatePhoto(currentPhoto.id, { filter: filterName });
    }
  };

  // Apply frame to current photo
  const applyFrame = (frameName) => {
    setSelectedFrame(frameName);
    if (currentPhoto) {
      updatePhoto(currentPhoto.id, { frame: frameName });
    }
  };

  // Undo last edit
  const undo = () => {
    if (editHistory.length > 0) {
      const lastState = editHistory[editHistory.length - 1];
      setCurrentPhoto(lastState);
      setEditHistory(prev => prev.slice(0, -1));
    }
  };

  // Save edit state to history
  const saveToHistory = () => {
    if (currentPhoto) {
      setEditHistory(prev => [...prev, { ...currentPhoto }]);
    }
  };

  const value = {
    photos,
    currentPhoto,
    selectedFilter,
    selectedFrame,
    editHistory,
    loading,
    setLoading,
    setCurrentPhoto,
    addPhoto,
    updatePhoto,
    deletePhoto,
    clearAllPhotos,
    getPhotoById,
    applyFilter,
    applyFrame,
    undo,
    saveToHistory
  };

  return (
    <PhotoContext.Provider value={value}>
      {children}
    </PhotoContext.Provider>
  );
};