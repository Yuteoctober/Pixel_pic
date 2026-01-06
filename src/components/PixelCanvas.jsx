import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const PixelCanvas = ({ imageSrc, pixelSize, contrast, brightness, saturation, canvasRef }) => {
  const internalCanvasRef = useRef(null);
  // Use forwarded ref or internal fall back (though for this app we expect forwarded)
  const ref = canvasRef || internalCanvasRef;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !imageSrc) return;

    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      // Set dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Calculate scaled dimensions
      // If pixelSize is 10, each "pixel" is 10x10 real pixels.
      // So we render at 1/10th resolution.
      // Avoid division by zero
      const size = Math.max(1, pixelSize);
      
      const w = canvas.width;
      const h = canvas.height;
      const scaledW = w / size;
      const scaledH = h / size;

      // Disable smoothing for sharp edges
      ctx.imageSmoothingEnabled = false;

      // Apply Filters
      ctx.filter = `contrast(${contrast}%) brightness(${brightness}%) saturate(${saturation}%)`;

      // Step 1: Draw image small (pixelate) into an offscreen canvas
      const offscreen = document.createElement('canvas');
      offscreen.width = scaledW;
      offscreen.height = scaledH;
      const offCtx = offscreen.getContext('2d');
      offCtx.imageSmoothingEnabled = false;
      
      // Draw to offscreen canvas
      offCtx.drawImage(img, 0, 0, scaledW, scaledH);

      // Reset filter so it doesn't apply again when scaling up (applied to main ctx)


      // Clear the main canvas before drawing final result
      ctx.clearRect(0, 0, w, h);

      // Step 2: Draw the small version back up to full size on main canvas
      ctx.drawImage(offscreen, 0, 0, scaledW, scaledH, 0, 0, w, h);
    };
  }, [imageSrc, pixelSize, contrast, brightness, saturation, ref]);

  return (
    <div className="w-full max-w-4xl mx-auto flex justify-center mb-8 overflow-hidden border-4 border-pixel-muted bg-pixel-base shadow-pixel ">
      <canvas
        ref={ref}
        className="max-w-full h-auto object-contain image-pixelated"
        style={{ maxHeight: '70vh' }}
      />
    </div>
  );

};

PixelCanvas.propTypes = {
  imageSrc: PropTypes.string,
  pixelSize: PropTypes.number.isRequired,
  contrast: PropTypes.number.isRequired,
  brightness: PropTypes.number.isRequired,
  saturation: PropTypes.number.isRequired,
  canvasRef: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.object })
  ]),
};

export default PixelCanvas;
