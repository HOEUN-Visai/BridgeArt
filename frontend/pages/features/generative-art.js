import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import ImageGenerator from '../../components/ImageGenerator';
import {
  SparklesIcon,
  ArrowPathIcon,
  PaintBrushIcon,
  AdjustmentsHorizontalIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

const artTypes = [
  { id: 'cosmic', name: 'Cosmic', description: 'Create stunning cosmic patterns and nebulas' },
  { id: 'geometric', name: 'Geometric', description: 'Generate precise geometric patterns and shapes' },
  { id: 'abstract', name: 'Abstract', description: 'Create unique abstract compositions' },
  { id: 'gradient', name: 'Gradient', description: 'Generate beautiful gradient-based art' },
];

const colorPalettes = [
  { id: 'cosmic', colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'] },
  { id: 'geometric', colors: ['#FF9800', '#F44336', '#9C27B0'] },
  { id: 'abstract', colors: ['#E91E63', '#FF4081', '#FF80AB'] },
  { id: 'gradient', colors: ['#2196F3', '#03A9F4', '#00BCD4'] },
];

export default function GenerativeArt() {
  const [selectedType, setSelectedType] = useState('cosmic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const handleDownload = () => {
    // Implement download functionality
    console.log('Downloading art...');
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
              Generative Art Creation
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Create unique algorithmic art pieces with our advanced generation tools
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1">
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-6">Art Controls</h2>
              
              {/* Art Type Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Art Type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {artTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleTypeChange(type.id)}
                      className={`p-3 rounded-lg text-center transition-all ${
                        selectedType === type.id
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Art Type Description */}
              <div className="mb-6">
                <p className="text-gray-300">
                  {artTypes.find(t => t.id === selectedType)?.description}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
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
                      Generate New Art
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleDownload}
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                  Download Art
                </button>
              </div>
            </div>
          </div>
          
          {/* Art Preview */}
          <div className="lg:col-span-2">
            <div className="glass rounded-xl overflow-hidden aspect-square">
              <ImageGenerator 
                type={selectedType} 
                colors={colorPalettes.find(p => p.id === selectedType)?.colors || colorPalettes[0].colors} 
              />
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="mt-16" ref={ref}>
          <h2 className="text-3xl font-bold mb-8 text-center">Advanced Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass p-6 rounded-xl"
            >
              <SparklesIcon className="h-10 w-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Unique Generation</h3>
              <p className="text-gray-400">
                Each piece is algorithmically generated to ensure uniqueness and originality.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass p-6 rounded-xl"
            >
              <AdjustmentsHorizontalIcon className="h-10 w-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customizable</h3>
              <p className="text-gray-400">
                Fine-tune parameters to create exactly the art style you envision.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass p-6 rounded-xl"
            >
              <PaintBrushIcon className="h-10 w-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">NFT Ready</h3>
              <p className="text-gray-400">
                Generated art is immediately ready to be minted as an NFT on your preferred blockchain.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-16">
          <div className="glass rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Your Masterpiece?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Start generating unique algorithmic art pieces and mint them as NFTs on your preferred blockchain.
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