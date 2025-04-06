import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
  SparklesIcon,
  ArrowPathIcon,
  AdjustmentsHorizontalIcon,
  ArrowDownTrayIcon,
  LightBulbIcon,
  DocumentTextIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';

const stylePresets = [
  { id: 'realistic', name: 'Realistic', description: 'Photorealistic images with high detail' },
  { id: 'anime', name: 'Anime', description: 'Japanese anime and manga style' },
  { id: 'painterly', name: 'Painterly', description: 'Oil painting style with visible brushstrokes' },
  { id: 'pixel', name: 'Pixel Art', description: 'Retro pixel art style' },
  { id: 'watercolor', name: 'Watercolor', description: 'Soft, flowing watercolor style' },
  { id: 'cyberpunk', name: 'Cyberpunk', description: 'Futuristic, neon-lit cyberpunk style' },
];

const samplePrompts = [
  'A cosmic nebula with swirling colors and distant stars',
  'A geometric pattern with interlocking shapes and vibrant colors',
  'An abstract flow of colors and shapes',
  'A futuristic cityscape with flying vehicles and neon lights',
  'A serene landscape with mountains and a reflective lake',
  'A portrait of a person with glowing aura and ethereal background',
];

export default function AIGeneration() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleStyleChange = (styleId) => {
    setSelectedStyle(styleId);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * samplePrompts.length);
    setPrompt(samplePrompts[randomIndex]);
  };

  const handleGenerate = () => {
    if (!prompt) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation process
    setTimeout(() => {
      // In a real app, this would be an API call to an AI service
      setGeneratedImage('/sample-nft-1.jpg');
      setIsGenerating(false);
    }, 3000);
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    // Implement download functionality
    console.log('Downloading generated image...');
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
              AI-Powered Generation
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Leverage AI to create stunning and unique digital artworks
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <div>
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-6">AI Generation Controls</h2>
              
              {/* Prompt Input */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Describe Your Art</h3>
                <div className="relative">
                  <textarea
                    value={prompt}
                    onChange={handlePromptChange}
                    placeholder="Describe the art you want to generate..."
                    className="input-primary w-full h-32 p-3"
                  />
                  <button
                    onClick={handleRandomPrompt}
                    className="absolute top-2 right-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
                    title="Get a random prompt"
                  >
                    <LightBulbIcon className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Be specific about what you want to create. The more details you provide, the better the result.
                </p>
              </div>
              
              {/* Style Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Art Style</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {stylePresets.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => handleStyleChange(style.id)}
                      className={`p-3 rounded-lg text-center transition-all ${
                        selectedStyle === style.id
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                    >
                      {style.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Style Description */}
              <div className="mb-6">
                <p className="text-gray-300">
                  {stylePresets.find(s => s.id === selectedStyle)?.description}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt}
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <ArrowPathIcon className="h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="h-5 w-5" />
                      Generate Art
                    </>
                  )}
                </button>
                
                {generatedImage && (
                  <button
                    onClick={handleDownload}
                    className="btn-secondary flex items-center justify-center gap-2"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5" />
                    Download Art
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Preview Panel */}
          <div>
            <div className="glass p-6 rounded-xl h-full">
              <h2 className="text-2xl font-semibold mb-6">Preview</h2>
              
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-[400px]">
                  <ArrowPathIcon className="h-16 w-16 text-primary-500 animate-spin mb-4" />
                  <p className="text-xl">Generating your artwork...</p>
                  <p className="text-gray-400 mt-2">This may take a few moments</p>
                </div>
              ) : generatedImage ? (
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img 
                    src={generatedImage} 
                    alt="Generated artwork" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-semibold">AI Generated Art</h3>
                    <p className="text-gray-300">{prompt}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Style: {stylePresets.find(s => s.id === selectedStyle)?.name}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] bg-gray-800 rounded-lg">
                  <PhotoIcon className="h-16 w-16 text-gray-600 mb-4" />
                  <p className="text-xl">Your generated art will appear here</p>
                  <p className="text-gray-400 mt-2">Enter a prompt and click Generate</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="mt-16" ref={ref}>
          <h2 className="text-3xl font-bold mb-8 text-center">AI Generation Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass p-6 rounded-xl"
            >
              <SparklesIcon className="h-10 w-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Advanced AI Models</h3>
              <p className="text-gray-400">
                Powered by state-of-the-art AI models trained on millions of artworks.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass p-6 rounded-xl"
            >
              <AdjustmentsHorizontalIcon className="h-10 w-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Style Customization</h3>
              <p className="text-gray-400">
                Choose from multiple art styles to match your creative vision.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass p-6 rounded-xl"
            >
              <DocumentTextIcon className="h-10 w-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Prompt Guidance</h3>
              <p className="text-gray-400">
                Get help with writing effective prompts for better results.
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
              <h3 className="text-xl font-semibold mb-2">Describe Your Vision</h3>
              <p className="text-gray-400">
                Write a detailed description of the artwork you want to create.
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
              <h3 className="text-xl font-semibold mb-2">Choose Your Style</h3>
              <p className="text-gray-400">
                Select an art style that matches your creative vision.
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
              <h3 className="text-xl font-semibold mb-2">Generate & Download</h3>
              <p className="text-gray-400">
                Let AI create your artwork and download it to use as an NFT.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-16">
          <div className="glass rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Create with AI?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Start generating unique AI-powered artworks and mint them as NFTs on your preferred blockchain.
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