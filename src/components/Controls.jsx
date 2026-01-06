
import PropTypes from 'prop-types';
import { Download, RefreshCw, Settings, LayersPlus, Eraser } from 'lucide-react';

const Controls = ({ 
  pixelSize, setPixelSize, 
  contrast, setContrast,
  brightness, setBrightness,
  saturation, setSaturation,
  onDownload, onReset,
  onNewFile,
  onRemoveBackground,
  isProcessing
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-pixel-card border-4 border-pixel-border p-6 shadow-pixel mb-8">
      <div className="flex items-center gap-2 mb-6 border-b-2 border-pixel-border pb-4">
        <Settings className="w-6 h-6 text-pixel-primary" />
        <h2 className="text-lg font-press-start text-pixel-primary">SETTINGS</h2>
      </div>

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
              max="128"
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
        
        <div className="pt-4 border-t-2  border-pixel-muted/30 mt-4">
          <button
            onClick={onRemoveBackground}
            disabled={isProcessing}
            className={`w-full flex border-2 border-pixel-muted items-center justify-center gap-2 py-3 px-4 ${isProcessing ? 'bg-pixel-muted cursor-not-allowed' : 'bg-pixel-primary text-pixel-base hover:bg-pixel-accent-hover'} transition-all font-press-start text-xs shadow-pixel-sm active:translate-y-1 active:shadow-none`}
          >
            <Eraser className="w-5 h-5 text-pixel-muted" />
            <span className='mt-1 text-pixel-muted relative'>
              REMOVE BACKGROUND
            </span>
          </button>
        </div>

    </div>
  );
};

Controls.propTypes = {
  pixelSize: PropTypes.number.isRequired,
  setPixelSize: PropTypes.func.isRequired,
  contrast: PropTypes.number.isRequired,
  setContrast: PropTypes.func.isRequired,
  brightness: PropTypes.number.isRequired,
  setBrightness: PropTypes.func.isRequired,
  saturation: PropTypes.number.isRequired,
  setSaturation: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onNewFile: PropTypes.func.isRequired,
  onRemoveBackground: PropTypes.func, // Optional as it might not be passed initially
  isProcessing: PropTypes.bool,
};

export default Controls;
