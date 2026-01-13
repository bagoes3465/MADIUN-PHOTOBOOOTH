import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, Trash2, Download, Share2, Edit, 
  ImageOff, Grid, List 
} from 'lucide-react';
import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import Modal from '../components/UI/Modal';
import { usePhoto } from '../context/PhotoContext';
import { useToast, ToastContainer } from '../components/UI/Toast';

const Gallery = () => {
  const navigate = useNavigate();
  const { photos, deletePhoto, clearAllPhotos } = usePhoto();
  const { toasts, hideToast, success, error } = useToast();
  
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleEdit = (photo) => {
    navigate(`/edit/${photo.id}`);
  };

  const handleDelete = (photo) => {
    deletePhoto(photo.id);
    setSelectedPhoto(null);
    setShowDeleteModal(false);
    success('Photo deleted successfully');
  };

  const handleDownload = (photo) => {
    const link = document.createElement('a');
    link.href = photo.data;
    link.download = `photobooth-${photo.id}.jpg`;
    link.click();
    success('Photo downloaded');
  };

  const handleShare = (photo) => {
    navigate(`/download/${photo.id}`);
  };

  const handleClearAll = () => {
    clearAllPhotos();
    setShowClearModal(false);
    success('All photos cleared');
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <ToastContainer toasts={toasts} onClose={hideToast} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Photo Gallery
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {photos.length} {photos.length === 1 ? 'photo' : 'photos'} captured
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <IconButton
              icon={viewMode === 'grid' ? List : Grid}
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              ariaLabel="Toggle view mode"
            />
            {photos.length > 0 && (
              <Button
                icon={Trash2}
                variant="danger"
                size="sm"
                onClick={() => setShowClearModal(true)}
              >
                Clear All
              </Button>
            )}
            <Button
              icon={Camera}
              size="sm"
              onClick={() => navigate('/capture')}
            >
              Take Photo
            </Button>
          </div>
        </div>

        {/* Gallery Grid */}
        {photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <ImageOff size={80} className="text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              No photos yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
              Start capturing amazing moments with our photobooth
            </p>
            <Button
              icon={Camera}
              onClick={() => navigate('/capture')}
            >
              Take Your First Photo
            </Button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'gallery-grid' : 'space-y-4'}>
            {photos.map((photo) => (
              <div
                key={photo.id}
                className={viewMode === 'grid' ? 'photo-card' : 'bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-soft hover:shadow-medium transition-shadow'}
                onClick={() => handlePhotoClick(photo)}
              >
                {viewMode === 'grid' ? (
                  <>
                    <img src={photo.data} alt="Photo" />
                    <div className="photo-card-overlay">
                      <p className="text-white text-sm font-medium">
                        {formatDate(photo.timestamp)}
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <IconButton
                          icon={Edit}
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(photo);
                          }}
                          ariaLabel="Edit"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                        />
                        <IconButton
                          icon={Download}
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(photo);
                          }}
                          ariaLabel="Download"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                        />
                        <IconButton
                          icon={Trash2}
                          size="sm"
                          variant="danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPhoto(photo);
                            setShowDeleteModal(true);
                          }}
                          ariaLabel="Delete"
                          className="bg-red-500/80 backdrop-blur-sm hover:bg-red-600/80"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center p-4 space-x-4">
                    <img 
                      src={photo.data} 
                      alt="Photo" 
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Photo #{photo.id}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(photo.timestamp)}
                      </p>
                      {photo.edited && (
                        <span className="inline-block mt-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded">
                          Edited
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <IconButton
                        icon={Edit}
                        onClick={() => handleEdit(photo)}
                        ariaLabel="Edit"
                      />
                      <IconButton
                        icon={Download}
                        onClick={() => handleDownload(photo)}
                        ariaLabel="Download"
                      />
                      <IconButton
                        icon={Share2}
                        onClick={() => handleShare(photo)}
                        ariaLabel="Share"
                      />
                      <IconButton
                        icon={Trash2}
                        variant="danger"
                        onClick={() => {
                          setSelectedPhoto(photo);
                          setShowDeleteModal(true);
                        }}
                        ariaLabel="Delete"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Photo Detail Modal */}
      <Modal
        isOpen={selectedPhoto !== null && !showDeleteModal}
        onClose={() => setSelectedPhoto(null)}
        size="lg"
        title="Photo Details"
      >
        {selectedPhoto && (
          <div className="space-y-4">
            <img 
              src={selectedPhoto.data} 
              alt="Photo" 
              className="w-full rounded-lg"
            />
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Captured on {formatDate(selectedPhoto.timestamp)}
                </p>
                {selectedPhoto.edited && (
                  <span className="inline-block mt-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded">
                    Edited
                  </span>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                icon={Edit}
                onClick={() => handleEdit(selectedPhoto)}
                fullWidth
              >
                Edit
              </Button>
              <Button
                icon={Download}
                variant="secondary"
                onClick={() => handleDownload(selectedPhoto)}
                fullWidth
              >
                Download
              </Button>
              <Button
                icon={Share2}
                variant="secondary"
                onClick={() => handleShare(selectedPhoto)}
                fullWidth
              >
                Share
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        size="sm"
        title="Delete Photo"
      >
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to delete this photo? This action cannot be undone.
        </p>
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(selectedPhoto)}
            fullWidth
          >
            Delete
          </Button>
        </div>
      </Modal>

      {/* Clear All Confirmation Modal */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        size="sm"
        title="Clear All Photos"
      >
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to delete all {photos.length} photos? This action cannot be undone.
        </p>
        <div className="flex space-x-3">
          <Button
            variant="secondary"
            onClick={() => setShowClearModal(false)}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleClearAll}
            fullWidth
          >
            Clear All
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Gallery;