import React, { useRef, useEffect } from 'react';
import { useCamera } from '../../hooks/useCamera';

const CameraView = ({ onStreamReady, facingMode = 'user' }) => {
  const { videoRef, stream, error, isLoading } = useCamera(facingMode);

  useEffect(() => {
    if (stream && onStreamReady) {
      onStreamReady(stream);
    }
  }, [stream, onStreamReady]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white p-4">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Memuat kamera...</div>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className="w-full h-full object-cover"
    />
  );
};

export default CameraView;