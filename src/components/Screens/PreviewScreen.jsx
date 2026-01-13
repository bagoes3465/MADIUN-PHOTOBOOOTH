// src/components/Screens/PreviewScreen.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Home, Download, QrCode, Share2 } from 'lucide-react';

const QRCodeGenerator = ({ url }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!url || !canvasRef.current) return;

    // Load QRCode library
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    script.async = true;
    
    script.onload = () => {
      const container = canvasRef.current;
      container.innerHTML = '';
      
      try {
        new window.QRCode(container, {
          text: url,
          width: 200,
          height: 200,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: window.QRCode.CorrectLevel.H
        });
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };
    
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [url]);

  return (
    <div className="flex justify-center items-center">
      <div ref={canvasRef} />
    </div>
  );
};

const PreviewScreen = ({ image, onRetake, onHome }) => {
  const [downloadUrl, setDownloadUrl] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    // Generate download URL for QR code
    const generateDownloadUrl = async () => {
      try {
        const blob = await (await fetch(image)).blob();
        const url = URL.createObjectURL(blob);
        
        // Create a shareable link (in production, upload to server)
        const shareUrl = `${window.location.origin}?photo=${encodeURIComponent(url)}`;
        setDownloadUrl(shareUrl);
      } catch (error) {
        console.error('Error generating download URL:', error);
      }
    };

    if (image) {
      generateDownloadUrl();
    }
  }, [image]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `photobooth-madiun-${Date.now()}.png`;
    link.href = image;
    link.click();
    setDownloaded(true);

    // Reset downloaded state after 3 seconds
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const blob = await (await fetch(image)).blob();
        const file = new File([blob], 'photobooth-madiun.png', { type: 'image/png' });
        
        await navigator.share({
          title: 'Photobooth Madiun',
          text: 'Lihat foto saya dari Photobooth Madiun!',
          files: [file]
        });
      } catch (error) {
        console.error('Error sharing:', error);
        // Fallback to download
        handleDownload();
      }
    } else {
      // Fallback to download if share not supported
      handleDownload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-4xl w-full animate-slide-up">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Hasil Foto Anda! 🎉
          </h2>
          <p className="text-gray-600">
            Download atau scan QR Code untuk menyimpan foto
          </p>
        </div>

        {/* Image Preview */}
        <div className="mb-6 rounded-xl overflow-hidden shadow-2xl">
          <img 
            src={image} 
            alt="Captured" 
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Download & QR Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
          {/* Download Section */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Download size={24} className="text-green-600" />
              Download Langsung
            </h3>
            
            <button
              onClick={handleDownload}
              className={`w-full py-3 px-6 rounded-lg font-bold transition-all transform hover:scale-105 ${
                downloaded 
                  ? 'bg-green-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {downloaded ? '✓ Berhasil!' : 'Download Foto'}
            </button>

            {/* Share Button (for mobile) */}
            <button
              onClick={handleShare}
              className="w-full mt-3 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Share2 size={20} />
              Share Foto
            </button>
          </div>

          {/* QR Code Section */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <QrCode size={24} className="text-blue-600" />
              Scan QR Code
            </h3>
            
            <div className="bg-white p-4 rounded-lg shadow-inner">
              {showQR && downloadUrl ? (
                <QRCodeGenerator url={downloadUrl} />
              ) : (
                <button
                  onClick={() => setShowQR(true)}
                  className="w-full h-48 flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 transition-colors"
                >
                  <QrCode size={48} className="text-blue-400 mb-2" />
                  <span className="text-blue-600 font-semibold">
                    Tampilkan QR Code
                  </span>
                </button>
              )}
            </div>
            
            {showQR && (
              <p className="text-xs md:text-sm text-gray-600 text-center mt-3">
                Scan dengan HP lain untuk download
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={onRetake}
            className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Camera size={20} />
            Foto Lagi
          </button>
          
          <button
            onClick={onHome}
            className="flex-1 py-3 px-6 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Home size={20} />
            Ke Beranda
          </button>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800 text-center">
            💡 <strong>Tips:</strong> Screenshot halaman ini atau scan QR Code jika tombol download tidak berfungsi
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-white text-sm opacity-75">
          © 2024 Photobooth Madiun - Terima kasih sudah menggunakan layanan kami! ❤️
        </p>
      </div>
    </div>
  );
};

export default PreviewScreen;