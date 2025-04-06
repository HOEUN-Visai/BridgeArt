import { useState } from 'react';
import { motion } from 'framer-motion';
import ImageGenerator from './ImageGenerator';

const FeaturedProjects = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const projects = [
    {
      id: 1,
      name: 'Cosmic Patterns',
      artist: 'Digital Alchemist',
      description: 'Algorithmic exploration of cosmic phenomena',
      type: 'cosmic',
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
      price: '0.5 ETH',
      likes: 128,
      category: 'Generative',
    },
    {
      id: 2,
      name: 'Neural Landscapes',
      artist: 'AI Visionary',
      description: 'AI-generated abstract landscapes',
      type: 'abstract',
      colors: ['#FF00FF', '#00FF00', '#00FFFF'],
      price: '0.8 ETH',
      likes: 256,
      category: 'AI Art',
    },
    {
      id: 3,
      name: 'Quantum Waves',
      artist: 'Quantum Artist',
      description: 'Visualization of quantum mechanics',
      type: 'gradient',
      colors: ['#2E7D32', '#558B2F', '#827717'],
      price: '1.2 ETH',
      likes: 512,
      category: 'Scientific',
    },
    {
      id: 4,
      name: 'Geometric Harmony',
      artist: 'Pattern Weaver',
      description: 'Mathematical precision meets artistic expression',
      type: 'geometric',
      colors: ['#FF9800', '#F44336', '#9C27B0'],
      price: '0.7 ETH',
      likes: 384,
      category: 'Geometric',
    },
    {
      id: 5,
      name: 'Digital Nebula',
      artist: 'Space Explorer',
      description: 'Journey through digital cosmic landscapes',
      type: 'cosmic',
      colors: ['#2196F3', '#03A9F4', '#00BCD4'],
      price: '0.9 ETH',
      likes: 192,
      category: 'Space',
    },
    {
      id: 6,
      name: 'Abstract Emotions',
      artist: 'Emotion Painter',
      description: 'Visual representation of human emotions',
      type: 'abstract',
      colors: ['#E91E63', '#FF4081', '#FF80AB'],
      price: '1.5 ETH',
      likes: 320,
      category: 'Abstract',
    },
  ];

  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Generative Art</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -10 }}
            onHoverStart={() => setHoveredId(project.id)}
            onHoverEnd={() => setHoveredId(null)}
            className="glass rounded-xl overflow-hidden"
          >
            <div className="relative aspect-square">
              <ImageGenerator 
                type={project.type} 
                colors={project.colors} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <p className="text-gray-300">{project.artist}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-primary-400">{project.price}</span>
                  <span className="text-gray-400">{project.likes} likes</span>
                </div>
              </div>
              
              {/* Hover overlay */}
              {hoveredId === project.id && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center p-6"
                >
                  <div className="text-center">
                    <p className="text-white mb-4">{project.description}</p>
                    <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">
                      {project.category}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProjects; 