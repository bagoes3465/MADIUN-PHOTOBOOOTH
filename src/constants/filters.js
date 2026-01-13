// Photo filter presets
export const FILTERS = {
  NONE: {
    id: 'none',
    name: 'Original',
    css: '',
    canvas: null
  },
  GRAYSCALE: {
    id: 'grayscale',
    name: 'Grayscale',
    css: 'grayscale(100%)',
    canvas: (imageData) => {
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
      }
      return imageData;
    }
  },
  SEPIA: {
    id: 'sepia',
    name: 'Sepia',
    css: 'sepia(100%)',
    canvas: (imageData) => {
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
        data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
        data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
      }
      return imageData;
    }
  },
  VINTAGE: {
    id: 'vintage',
    name: 'Vintage',
    css: 'sepia(50%) contrast(120%) brightness(90%)',
    canvas: (imageData) => {
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i] * 1.2;
        data[i + 1] = data[i + 1] * 1.1;
        data[i + 2] = data[i + 2] * 0.9;
      }
      return imageData;
    }
  },
  BRIGHT: {
    id: 'bright',
    name: 'Bright',
    css: 'brightness(120%) contrast(110%)',
    canvas: (imageData) => {
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] * 1.2);
        data[i + 1] = Math.min(255, data[i + 1] * 1.2);
        data[i + 2] = Math.min(255, data[i + 2] * 1.2);
      }
      return imageData;
    }
  },
  COOL: {
    id: 'cool',
    name: 'Cool',
    css: 'saturate(120%) hue-rotate(-15deg)',
    canvas: (imageData) => {
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i] * 0.9;
        data[i + 2] = Math.min(255, data[i + 2] * 1.2);
      }
      return imageData;
    }
  },
  WARM: {
    id: 'warm',
    name: 'Warm',
    css: 'saturate(120%) hue-rotate(15deg)',
    canvas: (imageData) => {
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] * 1.2);
        data[i + 1] = Math.min(255, data[i + 1] * 1.1);
      }
      return imageData;
    }
  },
  DRAMATIC: {
    id: 'dramatic',
    name: 'Dramatic',
    css: 'contrast(150%) saturate(130%)',
    canvas: (imageData) => {
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        const avg = (r + g + b) / 3;
        data[i] = avg + (r - avg) * 1.5;
        data[i + 1] = avg + (g - avg) * 1.5;
        data[i + 2] = avg + (b - avg) * 1.5;
      }
      return imageData;
    }
  },
  BLUR: {
    id: 'blur',
    name: 'Soft',
    css: 'blur(2px) brightness(105%)',
    canvas: null // Canvas blur is complex, use CSS
  },
  SHARPEN: {
    id: 'sharpen',
    name: 'Sharp',
    css: 'contrast(120%) brightness(105%)',
    canvas: null
  },
  INVERT: {
    id: 'invert',
    name: 'Invert',
    css: 'invert(100%)',
    canvas: (imageData) => {
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }
      return imageData;
    }
  }
};

// Get filter array for display
export const getFilterArray = () => {
  return Object.values(FILTERS);
};

// Get filter by ID
export const getFilterById = (filterId) => {
  return FILTERS[filterId.toUpperCase()] || FILTERS.NONE;
};

export default FILTERS;