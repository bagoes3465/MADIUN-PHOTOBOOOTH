import { useState, useEffect, useRef } from 'react';

export const useCamera = (facingMode = 'user') => {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    let currentStream = null;

    const startCamera = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });

        currentStream = mediaStream;
        setStream(mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Camera access error:', err);
        setError('Tidak dapat mengakses kamera. Pastikan izin kamera sudah diberikan.');
        setIsLoading(false);
      }
    };

    startCamera();

    // Cleanup function
    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  return {
    videoRef,
    stream,
    error,
    isLoading,
    stopCamera
  };
};