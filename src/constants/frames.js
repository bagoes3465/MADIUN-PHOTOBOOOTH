// Photo frame templates
export const FRAMES = {
  NONE: {
    id: 'none',
    name: 'No Frame',
    url: null,
    preview: null
  },
  CLASSIC: {
    id: 'classic',
    name: 'Classic',
    url: '/assets/frames/frame-1.png',
    preview: '/assets/frames/frame-1-preview.png',
    description: 'Classic white border frame'
  },
  MODERN: {
    id: 'modern',
    name: 'Modern',
    url: '/assets/frames/frame-2.png',
    preview: '/assets/frames/frame-2-preview.png',
    description: 'Modern gradient frame'
  },
  ELEGANT: {
    id: 'elegant',
    name: 'Elegant',
    url: '/assets/frames/frame-3.png',
    preview: '/assets/frames/frame-3-preview.png',
    description: 'Elegant golden frame'
  },
  MADIUN_EVENT: {
    id: 'madiun_event',
    name: 'Madiun Event',
    url: '/assets/frames/madiun-event.png',
    preview: '/assets/frames/madiun-event-preview.png',
    description: 'Special frame for Madiun events',
    custom: true
  },
  BIRTHDAY: {
    id: 'birthday',
    name: 'Birthday',
    url: '/assets/frames/birthday.png',
    preview: '/assets/frames/birthday-preview.png',
    description: 'Birthday celebration frame'
  },
  WEDDING: {
    id: 'wedding',
    name: 'Wedding',
    url: '/assets/frames/wedding.png',
    preview: '/assets/frames/wedding-preview.png',
    description: 'Wedding event frame'
  },
  PARTY: {
    id: 'party',
    name: 'Party',
    url: '/assets/frames/party.png',
    preview: '/assets/frames/party-preview.png',
    description: 'Party celebration frame'
  },
  GRADUATION: {
    id: 'graduation',
    name: 'Graduation',
    url: '/assets/frames/graduation.png',
    preview: '/assets/frames/graduation-preview.png',
    description: 'Graduation ceremony frame'
  }
};

// Frame positions for overlaying
export const FRAME_POSITIONS = {
  FULL: 'full', // Full overlay
  TOP: 'top', // Top border only
  BOTTOM: 'bottom', // Bottom border only
  SIDES: 'sides', // Left and right borders
  CORNERS: 'corners' // Corner decorations
};

// Get frame array for display
export const getFrameArray = () => {
  return Object.values(FRAMES);
};

// Get frame by ID
export const getFrameById = (frameId) => {
  return FRAMES[frameId.toUpperCase()] || FRAMES.NONE;
};

// Get custom frames only
export const getCustomFrames = () => {
  return Object.values(FRAMES).filter(frame => frame.custom);
};

// Frame settings
export const FRAME_SETTINGS = {
  defaultOpacity: 1.0,
  defaultBlendMode: 'normal',
  allowResize: true,
  allowRotate: false
};

export default FRAMES;