import { useState, useRef } from 'react';

export const usePhotoCapture = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef(null);

  const capturePhoto = async (videoElement, options = {}) => {
    if (!videoElement || !canvasRef.current) {
      throw new Error('Video element or canvas not available');
    }

    const {
      background = null,
      watermarkText = '📸 PHOTOBOOTH MADIUN',
      addDate = true
    } = options;

    setIsProcessing(true);

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Set canvas dimensions to match video
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;

      // Apply background if provided
      if (background && background.gradient) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, background.color);
        gradient.addColorStop(1, '#ffffff');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw video frame
      if (background && background.id !== 'none') {
        ctx.globalAlpha = 0.9;
      }
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1.0;

      // Add watermark
      if (watermarkText) {
        addWatermark(ctx, canvas, watermarkText, addDate);
      }

      // Convert to image data
      const imageData = canvas.toDataURL('image/png');
      setCapturedImage(imageData);

      setIsProcessing(false);
      return imageData;
    } catch (error) {
      setIsProcessing(false);
      throw error;
    }
  };

  const addWatermark = (ctx, canvas, text, includeDate) => {
    // Main watermark text
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    
    // Text shadow for better visibility
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillText(text, canvas.width / 2 + 2, canvas.height - 48);
    
    // Main text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText(text, canvas.width / 2, canvas.height - 50);
    
    // Add date if requested
    if (includeDate) {
      const date = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      
      ctx.font = '20px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText(date, canvas.width / 2, canvas.height - 20);
    }
  };

  const clearCapturedImage = () => {
    setCapturedImage(null);
  };

  return {
    canvasRef,
    capturedImage,
    isProcessing,
    capturePhoto,
    clearCapturedImage
  };
};