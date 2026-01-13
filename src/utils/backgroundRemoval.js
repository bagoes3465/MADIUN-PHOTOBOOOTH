/**
 * Simple background replacement using color keying (chroma key)
 * This is a basic implementation. For production, use TensorFlow.js BodyPix or MediaPipe
 */
export const replaceBackgroundSimple = (ctx, canvas, newBackground, threshold = 100) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Simple green screen detection (adjust as needed)
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Detect green background (simple approach)
    if (g > r + threshold && g > b + threshold) {
      // Make pixel transparent
      data[i + 3] = 0;
    }
  }

  ctx.putImageData(imageData, 0, 0);
};

/**
 * Apply gradient background
 */
export const applyGradientBackground = (ctx, canvas, background) => {
  if (!background || !background.gradient) return;

  // Create temporary canvas
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;

  // Draw original image to temp canvas
  tempCtx.drawImage(canvas, 0, 0);

  // Clear main canvas and draw gradient
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, background.color);
  gradient.addColorStop(1, '#ffffff');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Overlay original image with transparency
  ctx.globalAlpha = 0.9;
  ctx.drawImage(tempCanvas, 0, 0);
  ctx.globalAlpha = 1.0;
};

/**
 * Load and apply background image
 */
export const applyBackgroundImage = async (ctx, canvas, backgroundUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      // Create temporary canvas with current content
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCtx.drawImage(canvas, 0, 0);

      // Draw background image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Overlay original content
      ctx.globalAlpha = 0.85;
      ctx.drawImage(tempCanvas, 0, 0);
      ctx.globalAlpha = 1.0;

      resolve();
    };
    
    img.onerror = reject;
    img.src = backgroundUrl;
  });
};

/**
 * Blur background (simple box blur)
 */
export const blurBackground = (ctx, canvas, radius = 5) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;

  // Simple box blur implementation
  const blur = (data, width, height, radius) => {
    const output = new Uint8ClampedArray(data);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0, g = 0, b = 0, count = 0;
        
        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const nx = Math.min(Math.max(x + dx, 0), width - 1);
            const ny = Math.min(Math.max(y + dy, 0), height - 1);
            const i = (ny * width + nx) * 4;
            
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
          }
        }
        
        const i = (y * width + x) * 4;
        output[i] = r / count;
        output[i + 1] = g / count;
        output[i + 2] = b / count;
      }
    }
    
    return output;
  };

  const blurred = blur(data, width, height, radius);
  
  for (let i = 0; i < data.length; i++) {
    data[i] = blurred[i];
  }

  ctx.putImageData(imageData, 0, 0);
};