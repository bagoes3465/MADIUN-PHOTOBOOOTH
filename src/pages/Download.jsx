import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { Download as DownloadIcon, Share2, ArrowLeft, Clock, CheckCircle } from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { usePhoto } from '../context/PhotoContext';
import { CONFIG } from '../constants/config';

const Download = () => {
  const { qrCode } = useParams();
  const navigate = useNavigate();
  const { getPhotoById } = usePhoto();
  
  const [photo, setPhoto] = useState(null);
  const [qrUrl, setQrUrl] = useState('');
  const [expiryTime, setExpiryTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    if (qrCode) {
      // Find photo by ID (in real app, this would verify the QR code)
      const foundPhoto = getPhotoById(qrCode);
      if (foundPhoto) {
        setPhoto(foundPhoto);
        
        // Generate QR URL
        const url = `${CONFIG.QR.baseUrl}/${qrCode}`;
        setQrUrl(url);
        
        // Calculate expiry time
        const expiry = new Date();
        expiry.setHours(expiry.getHours() + CONFIG.QR.expireHours);
        setExpiryTime(expiry);
      } else {
        navigate('/gallery');
      }
    }
  }, [qrCode, getPhotoById, navigate]);

  // Update countdown timer
  useEffect(() => {
    if (!expiryTime) return;

    const updateTimer = () => {
      const now = new Date();
      const diff = expiryTime - now;

      if (diff <= 0) {
        setTimeRemaining('Expired');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expiryTime]);

  const handleDownload = () => {
    if (photo) {
      const link = document.createElement('a');
      link.href = photo.data;
      link.download = `photobooth-${photo.id}.jpg`;
      link.click();
    }
  };

  const handleShare = async () => {
    if (navigator.share && photo) {
      try {
        // Convert base64 to blob
        const response = await fetch(photo.data);
        const blob = await response.blob();
        const file = new File([blob], `photobooth-${photo.id}.jpg`, { type: 'image/jpeg' });

        await navigator.share({
          title: 'Photobooth Madiun',
          text: 'Check out my photo!',
          files: [file]
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(qrUrl);
      alert('Link copied to clipboard!');
    }
  };

  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `qr-code-${qrCode}.png`;
      link.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  if (!photo) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          icon={ArrowLeft}
          variant="ghost"
          onClick={() => navigate('/gallery')}
          className="mb-6"
        >
          Back to Gallery
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Photo Preview */}
          <Card>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Your Photo
              </h2>
              <img 
                src={photo.data} 
                alt="Photo" 
                className="w-full rounded-lg shadow-medium"
              />
              <div className="flex space-x-3">
                <Button
                  icon={DownloadIcon}
                  onClick={handleDownload}
                  fullWidth
                >
                  Download Photo
                </Button>
                {navigator.share && (
                  <Button
                    icon={Share2}
                    variant="secondary"
                    onClick={handleShare}
                    fullWidth
                  >
                    Share
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* QR Code */}
          <div className="space-y-6">
            <Card>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Scan to Download
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Scan this QR code with your phone to download the photo
                </p>

                {/* QR Code Display */}
                <div className="qr-code-container">
                  <QRCodeSVG
                    id="qr-code"
                    value={qrUrl}
                    size={CONFIG.QR.size}
                    level={CONFIG.QR.errorCorrectionLevel}
                    includeMargin={true}
                    className="qr-code-canvas"
                  />
                </div>

                <Button
                  icon={DownloadIcon}
                  variant="outline"
                  onClick={downloadQRCode}
                  fullWidth
                >
                  Download QR Code
                </Button>
              </div>
            </Card>

            {/* Info Cards */}
            <Card>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <Clock className="text-madiun-primary" size={24} />
                  <div>
                    <p className="font-semibold">Expires In</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {timeRemaining}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <CheckCircle className="text-green-500" size={24} />
                  <div>
                    <p className="font-semibold">Ready to Download</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Photo is ready for sharing
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Instructions */}
            <Card className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-900 dark:text-blue-200">
                  How to Download
                </h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800 dark:text-blue-300">
                  <li>Open your phone's camera app</li>
                  <li>Point it at the QR code above</li>
                  <li>Tap the notification that appears</li>
                  <li>Download your photo!</li>
                </ol>
              </div>
            </Card>
          </div>
        </div>

        {/* Additional Info */}
        <Card className="mt-8">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Share Your Moment
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              This QR code is valid for {CONFIG.QR.expireHours} hours. 
              After that, you can still access your photo from the gallery.
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate('/capture')}
              >
                Take Another Photo
              </Button>
              <Button
                onClick={() => navigate('/gallery')}
              >
                View Gallery
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Download;