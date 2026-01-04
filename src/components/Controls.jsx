import React from 'react';
import { Download, RefreshCw, Settings, LayersPlus  } from 'lucide-react';

const Controls = ({ 
  pixelSize, setPixelSize, 
  contrast, setContrast,
  brightness, setBrightness,
  saturation, setSaturation,
  onDownload, onReset,
  onNewFile
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-pixel-card border-4 border-pixel-border p-6 shadow-pixel mb-8">
      <div className="flex items-center gap-2 mb-6 border-b-2 border-pixel-border pb-4">
        <Settings className="w-6 h-6 text-pixel-primary" />
        <h2 className="text-lg font-press-start text-pixel-primary">SETTINGS</h2>
      </div>

      <div className="space-y-">
        <div className="space-y-6">
          {/* Pixel Size */}
          <div>
            <div className="flex justify-between mb-2 font-press-start text-xs text-pixel-muted">
              <label>PIXEL SIZE</label>
              <span className="text-pixel-accent">{pixelSize}px</span>
            </div>
            <input
              type="range"
              min="1"
              max="64"
              step="1"
              value={pixelSize}
              onChange={(e) => setPixelSize(Number(e.target.value))}
              className="slider-input w-full h-4 bg-pixel-dark border-2 border-pixel-muted appearance-none cursor-pointer"
            />
          </div>

          <div className="h-px bg-pixel-muted/50 my-4" />

          {/* Adjustments */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <div className="flex justify-between mb-2 font-press-start text-xs text-pixel-muted">
                <label>CONTRAST</label>
                <span className="text-pixel-accent">{contrast}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="slider-input w-full h-4 bg-pixel-dark border-2 border-pixel-muted appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2 font-press-start text-xs text-pixel-muted">
                <label>BRIGHTNESS</label>
                <span className="text-pixel-accent">{brightness}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="slider-input w-full h-4 bg-pixel-dark border-2 border-pixel-muted appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2 font-press-start text-xs text-pixel-muted">
                <label>SATURATION</label>
                <span className="text-pixel-accent">{saturation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                value={saturation}
                onChange={(e) => setSaturation(Number(e.target.value))}
                className="slider-input w-full h-4 bg-pixel-dark border-2 border-pixel-muted appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={onNewFile}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-pixel-base border-2 border-pixel-muted text-pixel-muted font-press-start text-xs hover:text-pixel-text hover:border-pixel-text transition-all active:translate-y-1 active:shadow-none shadow-pixel-sm"
          >
            <LayersPlus className="md:w-5 md:h-5 h-0 w-0"/>
            <span className='mt-1 md:right-0 right-1 relative'>
              NEW FILE
            </span>
          </button>

          <button
            onClick={onReset}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-pixel-base border-2 border-pixel-muted text-pixel-muted font-press-start text-xs hover:text-pixel-text hover:border-pixel-text transition-all active:translate-y-1 active:shadow-none shadow-pixel-sm"
          >
            <RefreshCw className="md:w-5 md:h-5 h-0 w-0" />
            <span className='mt-1 md:right-0 right-1 relative'>
              RESET
            </span>
          </button>
          
          <button
            onClick={onDownload}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-pixel-base border-2 border-pixel-muted text-pixel-muted font-press-start text-xs hover:text-pixel-text hover:border-pixel-text transition-all active:translate-y-1 active:shadow-none shadow-pixel-sm"
          >
            <Download className="md:w-5 md:h-5 h-0 w-0" />
              <span className='mt-1 md:right-0 right-1 relative'>
                SAVE
              </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
