import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
  PaintBrushIcon,
  ArrowPathIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  SwatchIcon,
  PencilIcon,
  EraserIcon,
  ScissorsIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from '@heroicons/react/24/outline';

const brushSizes = [2, 4, 8, 16, 24, 32];
const brushColors = [
  '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3',
  '#000000', '#FFFFFF', '#808080', '#C0C0C0', '#A52A2A', '#FFC0CB', '#00FFFF'
];

export default function InteractiveCanvas() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(8);
  const [brushColor, setBrushColor] = useState('#000000');
  const [tool, setTool] = useState('brush');
  const [zoom, setZoom] = useState(1);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Canvas context and drawing state
  const [ctx, setCtx] = useState(null);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
    
    // Set initial canvas style
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    
    setCtx(context);
  }, []);

  // Update context when brush properties change
  useEffect(() => {
    if (!ctx) return;
    
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
  }, [ctx, brushColor, brushSize]);

  const startDrawing = (e) => {
    if (!ctx) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;
    
    setIsDrawing(true);
    setLastX(x);
    setLastY(y);
    
    // Start a new path
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing || !ctx) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;
    
    if (tool === 'brush') {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (tool === 'eraser') {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.restore();
    }
    
    setLastX(x);
    setLastY(y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!ctx) return;
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    
    const dataURL = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'bridgeart-canvas.png';
    link.href = dataURL;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary-900/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Interactive Canvas
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Paint and create directly on our interactive digital canvas
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tools Panel */}
          <div className="lg:col-span-1">
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-6">Canvas Tools</h2>
              
              {/* Tool Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Drawing Tools</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTool('brush')}
                    className={`p-3 rounded-lg flex flex-col items-center justify-center gap-1 ${
                      tool === 'brush'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <PencilIcon className="h-5 w-5" />
                    <span className="text-xs">Brush</span>
                  </button>
                  <button
                    onClick={() => setTool('eraser')}
                    className={`p-3 rounded-lg flex flex-col items-center justify-center gap-1 ${
                      tool === 'eraser'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <EraserIcon className="h-5 w-5" />
                    <span className="text-xs">Eraser</span>
                  </button>
                </div>
              </div>
              
              {/* Brush Size */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Brush Size</h3>
                <div className="grid grid-cols-6 gap-2">
                  {brushSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setBrushSize(size)}
                      className={`p-2 rounded-lg flex items-center justify-center ${
                        brushSize === size
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                    >
                      <div 
                        className="bg-current rounded-full" 
                        style={{ width: size / 2, height: size / 2 }}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Color Palette */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Colors</h3>
                <div className="grid grid-cols-7 gap-2">
                  {brushColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setBrushColor(color)}
                      className={`w-8 h-8 rounded-full ${
                        brushColor === color
                          ? 'ring-2 ring-white'
                          : ''
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Zoom Controls */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Zoom</h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleZoomOut}
                    className="btn-secondary flex-1 flex items-center justify-center gap-1"
                  >
                    <ArrowsPointingInIcon className="h-5 w-5" />
                    <span>Out</span>
                  </button>
                  <button
                    onClick={handleZoomIn}
                    className="btn-secondary flex-1 flex items-center justify-center gap-1"
                  >
                    <ArrowsPointingOutIcon className="h-5 w-5" />
                    <span>In</span>
                  </button>
                </div>
                <p className="text-center text-sm text-gray-400 mt-2">
                  {Math.round(zoom * 100)}%
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={clearCanvas}
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <TrashIcon className="h-5 w-5" />
                  Clear Canvas
                </button>
                
                <button
                  onClick={handleDownload}
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                  Download Art
                </button>
              </div>
            </div>
          </div>
          
          {/* Canvas Area */}
          <div className="lg:col-span-3">
            <div className="glass p-6 rounded-xl overflow-hidden">
              <div 
                className="bg-white rounded-lg overflow-hidden"
                style={{ 
                  transform: `scale(${zoom})`,
                  transformOrigin: 'top left',
                  transition: 'transform 0.2s ease'
                }}
              >
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="cursor-crosshair"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="mt-16" ref={ref}>
          <h2 className="text-3xl font-bold mb-8 text-center">Canvas Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass p-6 rounded-xl"
            >
              <PaintBrushIcon className="h-10 w-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Professional Tools</h3>
              <p className="text-gray-400">
                Access a variety of drawing tools and brushes for professional-quality artwork.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass p-6 rounded-xl"
            >
              <SwatchIcon className="h-10 w-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Color Palette</h3>
              <p className="text-gray-400">
                Choose from a wide range of colors to bring your artwork to life.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass p-6 rounded-xl"
            >
              <ArrowDownTrayIcon className="h-10 w-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Export Options</h3>
              <p className="text-gray-400">
                Download your artwork in high resolution for printing or digital use.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* How It Works */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass p-6 rounded-xl"
            >
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Tools</h3>
              <p className="text-gray-400">
                Select from various brushes, colors, and tools to create your artwork.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass p-6 rounded-xl"
            >
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Art</h3>
              <p className="text-gray-400">
                Draw, paint, and create directly on the interactive canvas.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass p-6 rounded-xl"
            >
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Save & Share</h3>
              <p className="text-gray-400">
                Download your artwork and mint it as an NFT on your preferred blockchain.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-16">
          <div className="glass rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Your Masterpiece?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Start painting on our interactive canvas and turn your artwork into an NFT.
            </p>
            <Link href="/create">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-8 py-3 text-lg"
              >
                Start Creating
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 