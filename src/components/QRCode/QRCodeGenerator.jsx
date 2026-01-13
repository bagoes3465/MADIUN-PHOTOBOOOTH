import React, { useRef, useEffect } from 'react';

const QRCodeGenerator = ({ 
  url, 
  size = 200,
  colorDark = '#000000',
  colorLight = '#ffffff'
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!url || !containerRef.current) return;

    // Load QRCode.js library
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    script.async = true;
    
    script.onload = () => {
      const container = containerRef.current;
      if (!container) return;
      
      // Clear previous QR code
      container.innerHTML = '';
      
      try {
        new window.QRCode(container, {
          text: url,
          width: size,
          height: size,
          colorDark: colorDark,
          colorLight: colorLight,
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
  }, [url, size, colorDark, colorLight]);

  return (
    <div className="flex justify-center items-center">
      <div ref={containerRef} />
    </div>
  );
};

export default QRCodeGenerator;