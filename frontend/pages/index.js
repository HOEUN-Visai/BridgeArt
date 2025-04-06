import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
  SparklesIcon,
  CubeIcon,
  ArrowsRightLeftIcon,
  PaintBrushIcon,
  CodeBracketIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import FeaturedProjects from '../components/FeaturedProjects';

// Sample generative art projects - replace with actual projects
const featuredProjects = [
  {
    id: 1,
    name: 'Cosmic Patterns',
    artist: 'Digital Alchemist',
    description: 'Algorithmic exploration of cosmic phenomena',
    image: '/sample-nft-1.jpg',
    price: '0.5 ETH',
    likes: 128,
    category: 'Generative',
  },
  {
    id: 2,
    name: 'Neural Landscapes',
    artist: 'AI Visionary',
    description: 'AI-generated abstract landscapes',
    image: '/sample-nft-2.jpg',
    price: '0.8 ETH',
    likes: 256,
    category: 'AI Art',
  },
  {
    id: 3,
    name: 'Quantum Waves',
    artist: 'Quantum Artist',
    description: 'Visualization of quantum mechanics',
    image: '/sample-nft-3.jpg',
    price: '1.2 ETH',
    likes: 512,
    category: 'Scientific',
  },
];

const features = [
  {
    name: 'Generative Art Creation',
    description: 'Create unique algorithmic art pieces with our advanced generation tools',
    icon: SparklesIcon,
  },
  {
    name: 'Cross-Chain NFT Bridge',
    description: 'Seamlessly transfer your NFTs between different blockchains',
    icon: ArrowsRightLeftIcon,
  },
  {
    name: 'AI-Powered Generation',
    description: 'Leverage AI to create stunning and unique digital artworks',
    icon: CubeIcon,
  },
  {
    name: 'Interactive Canvas',
    description: 'Paint and create directly on our interactive digital canvas',
    icon: PaintBrushIcon,
  },
  {
    name: 'Custom Algorithms',
    description: 'Write and deploy your own generative art algorithms',
    icon: CodeBracketIcon,
  },
  {
    name: 'Market Analytics',
    description: 'Track your NFT performance with detailed analytics',
    icon: ChartBarIcon,
  },
];

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary-900/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              BridgeArt
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Where Generative Art Meets Cross-Chain Innovation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary px-8 py-3 text-lg"
                >
                  Create Art
                </motion.button>
              </Link>
              <Link href="/gallery">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary px-8 py-3 text-lg"
                >
                  Explore Gallery
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeaturedProjects />
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Unique Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.name}
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="glass p-6 rounded-xl"
            >
              <feature.icon className="h-12 w-12 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="glass rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community of artists and collectors. Create, collect, and bridge your NFTs across multiple blockchains.
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
  );
} 