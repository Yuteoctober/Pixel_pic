import React, { useEffect, useRef } from 'react';

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

      // Step 1: Draw image small (pixelate)
      // We draw it into the canvas itself (top-left) temporarily
      ctx.drawImage(img, 0, 0, scaledW, scaledH);

      // Reset filter so it doesn't apply again when scaling up
      ctx.filter = 'none';

      // Step 2: Draw the small version back up to full size
      // The source is the canvas itself (0,0 to scaledW,scaledH)
      // The dest is the full canvas (0,0 to w,h)
      ctx.drawImage(canvas, 0, 0, scaledW, scaledH, 0, 0, w, h);
    };
  }, [imageSrc, pixelSize, contrast, brightness, saturation, ref]);

  return (
    <div className="w-full max-w-4xl mx-auto flex justify-center mb-8 overflow-hidden border-4 border-pixel-muted bg-pixel-base shadow-pixel">
      <canvas
        ref={ref}
        className="max-w-full h-auto object-contain image-pixelated"
        style={{ maxHeight: '70vh' }}
      />
    </div>
  );
};

export default PixelCanvas;
