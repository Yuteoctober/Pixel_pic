import { useState, useRef, useEffect } from 'react';
import ImageUploader from './components/ImageUploader';
import Controls from './components/Controls';
import PixelCanvas from './components/PixelCanvas';
import { Layers, Sun, Moon, Sparkles } from 'lucide-react';
import { removeBackground } from '@imgly/background-removal';

const PixelEditor = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [pixelSize, setPixelSize] = useState(8);
  const [contrast, setContrast] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const canvasRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `pixel-art-${Date.now()}.png`;
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  const handleReset = () => {
    setPixelSize(8);
    setContrast(100);
    setBrightness(100);
    setSaturation(100);
  };



  const handleRemoveBackground = async () => {
    if (!imageSrc || isProcessing) return;
    
    try {
      setIsProcessing(true);
      const blob = await removeBackground(imageSrc);
      const url = URL.createObjectURL(blob);
      setImageSrc(url);
    } catch (error) {
      console.error('Failed to remove background:', error);
      alert('Failed to remove background. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNewFile = () => {
    setImageSrc(null);
    setPixelSize(8);
    setContrast(100);
    setBrightness(100);
    setSaturation(100);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center ">
      {/* Header */}
      <header className="mb-12 text-center relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
        <button
          onClick={toggleTheme}
          className="absolute right-0 top-0 p-2 bg-pixel-card border-2 border-pixel-border transition-colors cursor-pointer hover:border-pixel-accent-hover"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <div className="inline-flex items-center justify-center p-4 bg-pixel-card border-4 border-pixel-primary shadow-pixel-accent mb-4 mt-14 transform -rotate-2 hover:rotate-0 transition-transform">
            <Layers className="w-8 h-8 md:w-12 md:h-12 text-pixel-primary mr-4" />
            <h1 className="text-2xl md:text-4xl font-press-start text-color-text text-shadow-pixel">
                PIXEL PIC
            </h1>
        </div>
        <p className="font-press-start text-xs md:text-sm text-pixel-muted mt-8 tracking-wider">
            RETRO IMAGE CONVERTER
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full relative z-10">
        {!imageSrc ? (
          <ImageUploader onImageUpload={setImageSrc} />
        ) : (
          <div className="animate-in fade-in zoom-in duration-500">
            <PixelCanvas
              imageSrc={imageSrc}
              pixelSize={pixelSize}
              contrast={contrast}
              brightness={brightness}
              saturation={saturation}
              canvasRef={canvasRef}
            />
            <Controls
              pixelSize={pixelSize}
              setPixelSize={setPixelSize}
              contrast={contrast}
              setContrast={setContrast}
              brightness={brightness}
              setBrightness={setBrightness}
              saturation={saturation}
              setSaturation={setSaturation}
              onDownload={handleDownload}
              onReset={handleReset}
              onNewFile={handleNewFile}
              onRemoveBackground={handleRemoveBackground}
              isProcessing={isProcessing}
            />
            
            {/* Loading Overlay */}
            {isProcessing && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                <div className="bg-pixel-card p-8 border-4 border-pixel-primary shadow-pixel text-center">
                  <Sparkles className="w-12 h-12 text-pixel-primary mx-auto mb-4 animate-spin" />
                  <p className="font-press-start text-pixel-primary mb-2">DOING MAGIC...</p>
                  <p className="font-mono text-xs text-pixel-muted">REMOVING BACKGROUND (This may take a moment)</p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-pixel-muted font-mono text-xs flex flex-col items-center gap-1">
        <p>BUILD WITH REACT & TAILWIND</p>
        <p>
          Find more works 
          <a href="https://yuteoctober.github.io/wins95Portfolio/" target="_blank" rel="noopener noreferrer" className="text-pixel-primary hover:text-pixel-accent ml-1 hover:underline transition-colors">
          @here
          </a>
        </p>
      </footer>
    </div>
  );
};

export default PixelEditor;
