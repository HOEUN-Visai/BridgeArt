import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  SparklesIcon,
  ArrowPathIcon,
  CodeBracketIcon,
  PaintBrushIcon,
} from '@heroicons/react/24/outline';

const GenerativeArtCreator = () => {
  const canvasRef = useRef(null);
  const [algorithm, setAlgorithm] = useState('cosmic');
  const [parameters, setParameters] = useState({
    complexity: 50,
    colorScheme: 'cosmic',
    speed: 1,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [preview, setPreview] = useState(null);

  const algorithms = [
    {
      id: 'cosmic',
      name: 'Cosmic Patterns',
      description: 'Generate abstract patterns inspired by cosmic phenomena',
      icon: SparklesIcon,
    },
    {
      id: 'fractal',
      name: 'Fractal Explorer',
      description: 'Create intricate fractal patterns with customizable parameters',
      icon: CodeBracketIcon,
    },
    {
      id: 'flow',
      name: 'Flow Fields',
      description: 'Generate organic flowing patterns using vector fields',
      icon: PaintBrushIcon,
    },
  ];

  const colorSchemes = [
    { id: 'cosmic', name: 'Cosmic', colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'] },
    { id: 'neon', name: 'Neon', colors: ['#FF00FF', '#00FF00', '#00FFFF'] },
    { id: 'earth', name: 'Earth', colors: ['#2E7D32', '#558B2F', '#827717'] },
  ];

  const generateArt = async () => {
    setIsGenerating(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 800;
    
    // Generate art based on selected algorithm
    switch (algorithm) {
      case 'cosmic':
        await generateCosmicPattern(ctx);
        break;
      case 'fractal':
        await generateFractal(ctx);
        break;
      case 'flow':
        await generateFlowField(ctx);
        break;
    }
    
    // Create preview
    setPreview(canvas.toDataURL());
    setIsGenerating(false);
  };

  const generateCosmicPattern = async (ctx) => {
    const { complexity, colorScheme } = parameters;
    const colors = colorSchemes.find(scheme => scheme.id === colorScheme).colors;
    
    // Create star field
    for (let i = 0; i < complexity * 100; i++) {
      const x = Math.random() * ctx.canvas.width;
      const y = Math.random() * ctx.canvas.height;
      const radius = Math.random() * 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
    
    // Add nebula effect
    const gradient = ctx.createRadialGradient(
      ctx.canvas.width / 2,
      ctx.canvas.height / 2,
      0,
      ctx.canvas.width / 2,
      ctx.canvas.height / 2,
      ctx.canvas.width / 2
    );
    
    colors.forEach((color, index) => {
      gradient.addColorStop(index / (colors.length - 1), color + '40');
    });
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const generateFractal = async (ctx) => {
    // Implement fractal generation algorithm
    // This is a placeholder - implement actual fractal generation
  };

  const generateFlowField = async (ctx) => {
    // Implement flow field generation algorithm
    // This is a placeholder - implement actual flow field generation
  };

  return (
    <div className="glass p-6 rounded-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Algorithm Selection */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Choose Algorithm</h2>
          <div className="space-y-4">
            {algorithms.map((algo) => (
              <motion.div
                key={algo.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-lg cursor-pointer ${
                  algorithm === algo.id
                    ? 'bg-primary-500/20 border-2 border-primary-500'
                    : 'bg-gray-800/50'
                }`}
                onClick={() => setAlgorithm(algo.id)}
              >
                <div className="flex items-center space-x-4">
                  <algo.icon className="h-6 w-6 text-primary-500" />
                  <div>
                    <h3 className="font-medium">{algo.name}</h3>
                    <p className="text-sm text-gray-400">{algo.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Parameters */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-6">Parameters</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Complexity
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={parameters.complexity}
                  onChange={(e) =>
                    setParameters({ ...parameters, complexity: e.target.value })
                  }
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Color Scheme
                </label>
                <select
                  value={parameters.colorScheme}
                  onChange={(e) =>
                    setParameters({ ...parameters, colorScheme: e.target.value })
                  }
                  className="input-primary w-full"
                >
                  {colorSchemes.map((scheme) => (
                    <option key={scheme.id} value={scheme.id}>
                      {scheme.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateArt}
            disabled={isGenerating}
            className={`btn-primary w-full mt-8 ${
              isGenerating && 'opacity-50 cursor-not-allowed'
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center">
                <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" />
                Generating...
              </span>
            ) : (
              'Generate Art'
            )}
          </motion.button>
        </div>

        {/* Preview */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Preview</h2>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-800">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
            />
            {preview && (
              <img
                src={preview}
                alt="Generated Art"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerativeArtCreator; 