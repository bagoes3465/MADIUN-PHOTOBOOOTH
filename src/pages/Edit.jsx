import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  X, Check, RotateCcw, Download, Share2, 
  Sparkles, Image as ImageIcon, Type, Undo 
} from 'lucide-react';
import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import { usePhoto } from '../context/PhotoContext';
import { FILTERS, getFilterArray } from '../constants/filters';
import { FRAMES, getFrameArray } from '../constants/frames';
import { CONFIG } from '../constants/config';

const Edit = () => {
  const { photoId } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  
  const { currentPhoto, getPhotoById, updatePhoto, applyFilter, applyFrame, undo } = usePhoto();
  const [photo, setPhoto] = useState(null);
  const [activeTab, setActiveTab] = useState('filters');
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [selectedFrame, setSelectedFrame] = useState('none');

  useEffect(() => {
    if (photoId) {
      const foundPhoto = getPhotoById(photoId);
      if (foundPhoto) {
        setPhoto(foundPhoto);
        setSelectedFilter(foundPhoto.filter || 'none');
        setSelectedFrame(foundPhoto.frame || 'none');
      } else {
        navigate('/gallery');
      }
    } else if (currentPhoto) {
      setPhoto(currentPhoto);
    }
  }, [photoId, currentPhoto, getPhotoById, navigate]);

  const handleFilterSelect = (filterId) => {
    setSelectedFilter(filterId);
    applyFilter(filterId);
  };

  const handleFrameSelect = (frameId) => {
    setSelectedFrame(frameId);
    applyFrame(frameId);
  };

  const handleSave = () => {
    if (photo) {
      updatePhoto(photo.id, {
        filter: selectedFilter,
        frame: selectedFrame,
        edited: true
      });
      navigate('/gallery');
    }
  };

  const handleDownload = () => {
    if (photo) {
      const link = document.createElement('a');
      link.href = photo.data;
      link.download = `photobooth-${Date.now()}.jpg`;
      link.click();
    }
  };

  const handleShare = () => {
    // Navigate to QR code generation
    navigate(`/download/${photo?.id}`);
  };

  const tabs = [
    { id: 'filters', label: 'Filters', icon: Sparkles },
    { id: 'frames', label: 'Frames', icon: ImageIcon },
    { id: 'text', label: 'Text', icon: Type }
  ];

  if (!photo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <p className="text-white text-lg">Loading photo...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <IconButton
            icon={X}
            variant="ghost"
            onClick={() => navigate('/gallery')}
            ariaLabel="Close editor"
            className="text-white"
          />
          <h1 className="text-white text-lg font-semibold">Edit Photo</h1>
        </div>

        <div className="flex items-center space-x-2">
          <IconButton
            icon={Undo}
            variant="ghost"
            onClick={undo}
            ariaLabel="Undo"
            className="text-white"
          />
          <IconButton
            icon={Download}
            variant="ghost"
            onClick={handleDownload}
            ariaLabel="Download"
            className="text-white"
          />
          <IconButton
            icon={Share2}
            variant="ghost"
            onClick={handleShare}
            ariaLabel="Share"
            className="text-white"
          />
          <Button
            icon={Check}
            size="sm"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Photo Canvas */}
        <div className="flex-1 flex items-center justify-center bg-black p-4 overflow-auto">
          <div className="editor-canvas-container">
            <img
              ref={canvasRef}
              src={photo.data}
              alt="Editing"
              className="editor-canvas"
              style={{
                filter: FILTERS[selectedFilter.toUpperCase()]?.css || ''
              }}
            />
            {selectedFrame !== 'none' && FRAMES[selectedFrame.toUpperCase()]?.url && (
              <img
                src={FRAMES[selectedFrame.toUpperCase()].url}
                alt="Frame"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            )}
          </div>
        </div>

        {/* Editor Panel */}
        <div className="w-full lg:w-96 bg-gray-800 border-t lg:border-t-0 lg:border-l border-gray-700 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-white bg-gray-700'
                      : 'text-gray-400 hover:text-white hover:bg-gray-750'
                  }`}
                >
                  <Icon size={20} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'filters' && (
              <div className="space-y-4">
                <h3 className="text-white font-semibold mb-4">Choose Filter</h3>
                <div className="filter-selector">
                  {getFilterArray().map((filter) => (
                    <div
                      key={filter.id}
                      onClick={() => handleFilterSelect(filter.id)}
                      className={`filter-option ${selectedFilter === filter.id ? 'active' : ''}`}
                    >
                      <img
                        src={photo.data}
                        alt={filter.name}
                        style={{ filter: filter.css || '' }}
                      />
                      <span className="filter-name">{filter.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'frames' && (
              <div className="space-y-4">
                <h3 className="text-white font-semibold mb-4">Choose Frame</h3>
                <div className="frame-selector">
                  {getFrameArray().map((frame) => (
                    <div
                      key={frame.id}
                      onClick={() => handleFrameSelect(frame.id)}
                      className={`frame-option ${selectedFrame === frame.id ? 'active' : ''}`}
                    >
                      {frame.url ? (
                        <img src={frame.url} alt={frame.name} />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                          No Frame
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'text' && (
              <div className="space-y-4">
                <h3 className="text-white font-semibold mb-4">Add Text</h3>
                <p className="text-gray-400 text-sm">
                  Text overlay feature coming soon...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;