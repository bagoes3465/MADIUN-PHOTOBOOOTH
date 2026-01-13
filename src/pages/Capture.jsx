import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Camera, X, RotateCw, ZoomIn, ZoomOut, Settings } from 'lucide-react';
import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import { usePhoto } from '../context/PhotoContext';
import { useSession } from '../context/SessionContext';
import { CONFIG } from '../constants/config';

const Capture = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const { addPhoto } = usePhoto();
  const { incrementPhotoCount } = useSession();
  
  const [capturing, setCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [facingMode, setFacingMode] = useState('user');
  const [showSettings, setShowSettings] = useState(false);

  const videoConstraints = {
    width: CONFIG.CAMERA.width,
    height: CONFIG.CAMERA.height,
    facingMode: facingMode,
  };

  // Countdown before capture
  const startCountdown = useCallback(() => {
    let count = 3;
    setCountdown(count);

    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(interval);
        setCountdown(null);
        capturePhoto();
      }
    }, 1000);
  }, []);

  // Capture photo
  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      setCapturing(true);
      
      const imageSrc = webcamRef.current.getScreenshot({
        width: CONFIG.CAMERA.width,
        height: CONFIG.CAMERA.height,
      });

      if (imageSrc) {
        // Add photo to context
        const photo = addPhoto(imageSrc);
        incrementPhotoCount();

        // Flash effect
        setTimeout(() => {
          setCapturing(false);
          // Navigate to edit page
          navigate(`/edit/${photo.id}`);
        }, CONFIG.UI.captureFlashDuration);
      }
    }
  }, [addPhoto, incrementPhotoCount, navigate]);

  // Toggle camera (front/back)
  const toggleCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  // Handle close
  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Webcam */}
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className="absolute top-0 left-0 w-full h-full object-cover"
        mirrored={facingMode === 'user'}
      />

      {/* Flash Effect */}
      {capturing && (
        <div className="absolute inset-0 bg-white animate-pulse z-40" />
      )}

      {/* Countdown Overlay */}
      {countdown && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="countdown-timer">
            {countdown}
          </div>
        </div>
      )}

      {/* Camera Frame Overlay */}
      <div className="camera-overlay">
        <div className="camera-frame-overlay" />
      </div>

      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-30">
        <IconButton
          icon={X}
          variant="ghost"
          onClick={handleClose}
          ariaLabel="Close camera"
          className="bg-black/50 text-white hover:bg-black/70"
        />
        
        <div className="flex items-center space-x-2">
          <IconButton
            icon={RotateCw}
            variant="ghost"
            onClick={toggleCamera}
            ariaLabel="Switch camera"
            className="bg-black/50 text-white hover:bg-black/70"
          />
          <IconButton
            icon={Settings}
            variant="ghost"
            onClick={() => setShowSettings(!showSettings)}
            ariaLabel="Settings"
            className="bg-black/50 text-white hover:bg-black/70"
          />
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-20 right-4 bg-black/80 backdrop-blur-lg rounded-lg p-4 space-y-2 z-30 animate-slide-down">
          <p className="text-white text-sm font-medium mb-2">Camera Settings</p>
          <div className="flex items-center justify-between text-white text-sm">
            <span>Resolution</span>
            <span className="text-gray-400">{CONFIG.CAMERA.width}x{CONFIG.CAMERA.height}</span>
          </div>
          <div className="flex items-center justify-between text-white text-sm">
            <span>FPS</span>
            <span className="text-gray-400">{CONFIG.CAMERA.fps}</span>
          </div>
          <div className="flex items-center justify-between text-white text-sm">
            <span>Mode</span>
            <span className="text-gray-400">{facingMode === 'user' ? 'Front' : 'Back'}</span>
          </div>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center items-center z-30">
        <div className="flex items-center space-x-8">
          {/* Capture Button */}
          <button
            onClick={startCountdown}
            disabled={countdown !== null || capturing}
            className="w-20 h-20 rounded-full border-4 border-white bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110 active:scale-95"
            aria-label="Capture photo"
          >
            <div className="w-16 h-16 rounded-full bg-white" />
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-32 left-0 right-0 text-center z-20">
        <p className="text-white text-lg font-medium drop-shadow-lg">
          {countdown ? `Get Ready: ${countdown}` : 'Tap to capture'}
        </p>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <p className="text-white/70 text-sm font-medium drop-shadow-lg">
          {CONFIG.WATERMARK_TEXT}
        </p>
      </div>
    </div>
  );
};

export default Capture;