/**
 * Apply grayscale filter to image
 */
export const applyGrayscaleFilter = (ctx, canvas) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg;     // R
    data[i + 1] = avg; // G
    data[i + 2] = avg; // B
  }

  ctx.putImageData(imageData, 0, 0);
};

/**
 * Apply sepia filter to image
 */
export const applySepiaFilter = (ctx, canvas) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
    data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
    data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
  }

  ctx.putImageData(imageData, 0, 0);
};

/**
 * Adjust brightness
 */
export const adjustBrightness = (ctx, canvas, brightness = 20) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    data[i] += brightness;
    data[i + 1] += brightness;
    data[i + 2] += brightness;
  }

  ctx.putImageData(imageData, 0, 0);
};

/**
 * Adjust contrast
 */
export const adjustContrast = (ctx, canvas, contrast = 1.2) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

  for (let i = 0; i < data.length; i += 4) {
    data[i] = factor * (data[i] - 128) + 128;
    data[i + 1] = factor * (data[i + 1] - 128) + 128;
    data[i + 2] = factor * (data[i + 2] - 128) + 128;
  }

  ctx.putImageData(imageData, 0, 0);
};

/**
 * Apply vintage filter
 */
export const applyVintageFilter = (ctx, canvas) => {
  applySepiaFilter(ctx, canvas);
  adjustBrightness(ctx, canvas, -10);
  adjustContrast(ctx, canvas, 1.1);
};