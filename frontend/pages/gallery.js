import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  HeartIcon, 
  ShareIcon,
  FunnelIcon,
  ArrowsUpDownIcon
} from '@heroicons/react/24/outline';

// Sample NFT data - replace with actual data from your backend
const sampleNFTs = [
  {
    id: 1,
    name: 'Cosmic Dreams',
    artist: 'Alice Smith',
    image: '/sample-nft-1.jpg',
    likes: 234,
    price: '0.5 ETH',
    category: 'Digital Art',
  },
  {
    id: 2,
    name: 'Neon City',
    artist: 'Bob Johnson',
    image: '/sample-nft-2.jpg',
    likes: 156,
    price: '1.2 ETH',
    category: 'Photography',
  },
  // Add more sample NFTs...
];

const categories = ['All', 'Digital Art', 'Photography', '3D Art', 'Music', 'Video'];

const Gallery = () => {
  const [nfts, setNfts] = useState(sampleNFTs);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const filteredNFTs = nfts.filter(nft => {
    const matchesCategory = selectedCategory === 'All' || nft.category === selectedCategory;
    const matchesSearch = nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         nft.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLike = (id) => {
    setNfts(prev => prev.map(nft => 
      nft.id === id ? { ...nft, likes: nft.likes + 1 } : nft
    ));
  };

  const handleShare = (id) => {
    // Implement share functionality
    console.log('Sharing NFT:', id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">NFT Gallery</h1>
            <p className="text-gray-400">
              Discover unique digital artworks from talented creators
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="glass p-6 rounded-xl mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search NFTs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-primary w-full pl-10"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <div className="flex items-center space-x-2">
                <FunnelIcon className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-primary flex-1"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <ArrowsUpDownIcon className="h-5 w-5 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-primary flex-1"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
          </div>

          {/* NFT Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredNFTs.map((nft) => (
                <motion.div
                  key={nft.id}
                  variants={itemVariants}
                  className="glass rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
                >
                  <div className="relative aspect-square">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex justify-between items-center">
                          <button
                            onClick={() => handleLike(nft.id)}
                            className="flex items-center space-x-1 text-white hover:text-primary-500 transition-colors"
                          >
                            <HeartIcon className="h-5 w-5" />
                            <span>{nft.likes}</span>
                          </button>
                          <button
                            onClick={() => handleShare(nft.id)}
                            className="text-white hover:text-primary-500 transition-colors"
                          >
                            <ShareIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{nft.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">by {nft.artist}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-primary-500 font-medium">{nft.price}</span>
                      <span className="text-sm text-gray-400">{nft.category}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredNFTs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400">No NFTs found matching your criteria</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery; 