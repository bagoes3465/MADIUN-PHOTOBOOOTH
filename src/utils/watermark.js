/**
 * Add text watermark to canvas
 */
export const addTextWatermark = (ctx, canvas, options = {}) => {
  const {
    text = '📸 PHOTOBOOTH MADIUN',
    fontSize = 40,
    fontFamily = 'Arial',
    color = 'rgba(255, 255, 255, 0.9)',
    shadowColor = 'rgba(0, 0, 0, 0.5)',
    position = 'bottom-center',
    offsetX = 0,
    offsetY = 50
  } = options;

  ctx.font = `bold ${fontSize}px ${fontFamily}`;
  ctx.textAlign = 'center';
  
  let x, y;
  
  // Calculate position
  switch (position) {
    case 'top-center':
      x = canvas.width / 2 + offsetX;
      y = fontSize + offsetY;
      break;
    case 'bottom-center':
      x = canvas.width / 2 + offsetX;
      y = canvas.height - offsetY;
      break;
    case 'top-left':
      ctx.textAlign = 'left';
      x = offsetX + 20;
      y = fontSize + offsetY;
      break;
    case 'top-right':
      ctx.textAlign = 'right';
      x = canvas.width - offsetX - 20;
      y = fontSize + offsetY;
      break;
    case 'bottom-left':
      ctx.textAlign = 'left';
      x = offsetX + 20;
      y = canvas.height - offsetY;
      break;
    case 'bottom-right':
      ctx.textAlign = 'right';
      x = canvas.width - offsetX - 20;
      y = canvas.height - offsetY;
      break;
    default:
      x = canvas.width / 2;
      y = canvas.height - offsetY;
  }

  // Draw shadow
  ctx.fillStyle = shadowColor;
  ctx.fillText(text, x + 2, y + 2);
  
  // Draw main text
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

/**
 * Add date watermark
 */
export const addDateWatermark = (ctx, canvas, options = {}) => {
  const {
    fontSize = 20,
    position = 'bottom-center',
    offsetY = 20,
    locale = 'id-ID'
  } = options;

  const date = new Date().toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  ctx.font = `${fontSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  
  const x = canvas.width / 2;
  const y = canvas.height - offsetY;
  
  ctx.fillText(date, x, y);
};

/**
 * Add logo watermark from image
 */
export const addLogoWatermark = async (ctx, canvas, logoUrl, options = {}) => {
  const {
    width = 100,
    height = 100,
    position = 'bottom-right',
    offsetX = 20,
    offsetY = 20,
    opacity = 0.7
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      let x, y;
      
      switch (position) {
        case 'top-left':
          x = offsetX;
          y = offsetY;
          break;
        case 'top-right':
          x = canvas.width - width - offsetX;
          y = offsetY;
          break;
        case 'bottom-left':
          x = offsetX;
          y = canvas.height - height - offsetY;
          break;
        case 'bottom-right':
          x = canvas.width - width - offsetX;
          y = canvas.height - height - offsetY;
          break;
        default:
          x = canvas.width - width - offsetX;
          y = canvas.height - height - offsetY;
      }

      ctx.globalAlpha = opacity;
      ctx.drawImage(img, x, y, width, height);
      ctx.globalAlpha = 1.0;
      
      resolve();
    };
    
    img.onerror = reject;
    img.src = logoUrl;
  });
};