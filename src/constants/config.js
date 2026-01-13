// Application configuration
export const CONFIG = {
  // App Info
  APP_NAME: 'Photobooth Madiun',
  APP_VERSION: '1.0.0',
  APP_DESCRIPTION: 'Professional Photobooth Application',
  
  // API Configuration
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  API_TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT) || 30000,
  
  // Features
  ENABLE_ML: process.env.REACT_APP_ENABLE_ML === 'true',
  ENABLE_PRINT: process.env.REACT_APP_ENABLE_PRINT !== 'false',
  ENABLE_ANALYTICS: process.env.REACT_APP_ENABLE_ANALYTICS !== 'false',
  
  // Branding
  WATERMARK_TEXT: process.env.REACT_APP_WATERMARK_TEXT || 'PHOTOBOOTH MADIUN',
  WATERMARK_POSITION: process.env.REACT_APP_WATERMARK_POSITION || 'bottom-right',
  BRAND_COLOR: process.env.REACT_APP_BRAND_COLOR || '#2563eb',
  
  // Camera Settings
  CAMERA: {
    width: parseInt(process.env.REACT_APP_CAMERA_WIDTH) || 1920,
    height: parseInt(process.env.REACT_APP_CAMERA_HEIGHT) || 1080,
    fps: parseInt(process.env.REACT_APP_CAMERA_FPS) || 30,
    facingMode: 'user', // 'user' or 'environment'
    aspectRatio: 3 / 4,
    mirrored: true
  },
  
  // Photo Settings
  PHOTO: {
    format: process.env.REACT_APP_PHOTO_FORMAT || 'jpeg',
    quality: parseFloat(process.env.REACT_APP_PHOTO_QUALITY) || 0.95,
    maxSize: parseInt(process.env.REACT_APP_MAX_PHOTO_SIZE) || 5242880, // 5MB
    thumbnailSize: 200,
    watermarkOpacity: 0.7,
    watermarkSize: 14
  },
  
  // QR Code Settings
  QR: {
    expireHours: parseInt(process.env.REACT_APP_QR_EXPIRE_HOURS) || 24,
    size: parseInt(process.env.REACT_APP_QR_SIZE) || 256,
    baseUrl: process.env.REACT_APP_QR_BASE_URL || 'https://photoboothmadiun.com/download',
    errorCorrectionLevel: 'M', // L, M, Q, H
    margin: 4
  },
  
  // Storage Settings
  STORAGE: {
    type: process.env.REACT_APP_STORAGE_TYPE || 'local', // 'local' or 'cloud'
    maxPhotos: parseInt(process.env.REACT_APP_MAX_STORAGE_PHOTOS) || 100,
    autoCleanup: true,
    cleanupAfterDays: 7
  },
  
  // Session Settings
  SESSION: {
    timeout: parseInt(process.env.REACT_APP_SESSION_TIMEOUT) || 3600000, // 1 hour
    autoStart: true,
    trackStats: true
  },
  
  // Print Settings
  PRINT: {
    width: parseFloat(process.env.REACT_APP_PRINT_WIDTH) || 4, // inches
    height: parseFloat(process.env.REACT_APP_PRINT_HEIGHT) || 6, // inches
    dpi: parseInt(process.env.REACT_APP_PRINT_DPI) || 300,
    copies: 1,
    colorMode: 'color' // 'color' or 'grayscale'
  },
  
  // UI Settings
  UI: {
    countdownDuration: 3, // seconds
    captureFlashDuration: 200, // milliseconds
    toastDuration: 3000, // milliseconds
    animationDuration: 300, // milliseconds
    maxUndoHistory: 10
  },
  
  // Debug
  DEBUG_MODE: process.env.REACT_APP_DEBUG_MODE === 'true',
  SHOW_CONSOLE: process.env.REACT_APP_SHOW_CONSOLE === 'true'
};

// Social Media Links
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/photoboothmadiun',
  instagram: 'https://instagram.com/photoboothmadiun',
  twitter: 'https://twitter.com/photoboothmadiun',
  whatsapp: 'https://wa.me/62xxxxxxxxxx'
};

// Admin credentials (should be moved to backend in production)
export const ADMIN = {
  username: 'admin',
  password: process.env.REACT_APP_ADMIN_PASSWORD || 'admin123'
};

// Export default config
export default CONFIG;