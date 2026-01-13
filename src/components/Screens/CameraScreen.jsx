// src/components/Screens/CameraScreen.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Camera, Home, RotateCcw } from 'lucide-react';

const CameraScreen = ({ selectedBackground, onCapture, onBack }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Start camera on mount
  useEffect(() => {
    startCamera();
    return () => {
      // Cleanup camera
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setError(null);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Tidak dapat mengakses kamera. Pastikan izin kamera sudah diberikan.');
    }
  };

  const startCountdown = () => {
    if (countdown > 0 || isProcessing) return;

    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(() => capturePhoto(), 100);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsProcessing(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Apply background gradient if selected
    if (selectedBackground && selectedBackground.gradient) {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, selectedBackground.color);
      gradient.addColorStop(1, '#ffffff');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Draw video frame
    if (selectedBackground && selectedBackground.id !== 'none') {
      ctx.globalAlpha = 0.9; // Slight transparency for blend effect
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1.0;

    // Add watermark
    addWatermark(ctx, canvas);

    // Convert to image
    const imageData = canvas.toDataURL('image/png');
    
    setIsProcessing(false);
    onCapture(imageData);
  };

  const addWatermark = (ctx, canvas) => {
    // Watermark text
    const text = 'CUSTOM WATERMARK TEXT';
    
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    
    // Text shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillText(text, canvas.width / 2 + 2, canvas.height - 48);
    
    // Main text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText(text, canvas.width / 2, canvas.height - 50);
    
    // Date
    const date = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    ctx.font = '20px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText(date, canvas.width / 2, canvas.height - 20);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md text-center">
          <h3 className="font-bold mb-2">Error Kamera</h3>
          <p>{error}</p>
          <button
            onClick={onBack}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-white text-xl md:text-2xl font-bold text-center">
          Background: <span className="text-blue-400">{selectedBackground?.name}</span>
        </h2>
      </div>

      {/* Camera View */}
      <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        
        {/* Countdown Overlay */}
        {countdown > 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <div className="text-white text-8xl md:text-9xl font-bold animate-pulse">
              {countdown}
            </div>
          </div>
        )}

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60">
            <div className="text-white text-2xl mb-4">Memproses foto...</div>
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Guide Overlay */}
        <div className="absolute top-4 left-4 right-4">
          <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm text-center">
            Posisikan wajah Anda di tengah kamera
          </div>
        </div>

        {/* Hidden Canvas */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Controls */}
      <div className="mt-6 flex gap-4 items-center justify-center">
        <button
          onClick={onBack}
          className="p-3 md:p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors shadow-lg"
          title="Kembali ke Beranda"
        >
          <Home size={24} />
        </button>

        <button
          onClick={startCountdown}
          disabled={countdown > 0 || isProcessing}
          className="p-5 md:p-6 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all disabled:bg-gray-500 disabled:cursor-not-allowed shadow-xl transform hover:scale-110 disabled:scale-100"
          title="Ambil Foto (3 detik)"
        >
          <Camera size={32} />
        </button>

        <button
          onClick={() => window.location.reload()}
          className="p-3 md:p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors shadow-lg"
          title="Reset"
        >
          <RotateCcw size={24} />
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-6 text-center text-white text-sm opacity-75 max-w-md">
        <p>Tekan tombol kamera untuk memulai countdown 3 detik</p>
      </div>
    </div>
  );
};

export default CameraScreen;