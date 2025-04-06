import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  ArrowsRightLeftIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

// Sample supported chains - replace with actual chain data
const supportedChains = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    icon: '/ethereum-logo.png',
    description: 'The most popular blockchain for NFTs',
  },
  {
    id: 'solana',
    name: 'Solana',
    icon: '/solana-logo.png',
    description: 'Fast and low-cost transactions',
  },
  {
    id: 'polygon',
    name: 'Polygon',
    icon: '/polygon-logo.png',
    description: 'Scalable Ethereum sidechain',
  },
];

// Sample user NFTs - replace with actual NFT data
const sampleNFTs = [
  {
    id: 1,
    name: 'Cosmic Dreams',
    image: '/sample-nft-1.jpg',
    chain: 'ethereum',
    tokenId: '0x123...abc',
  },
  {
    id: 2,
    name: 'Neon City',
    image: '/sample-nft-2.jpg',
    chain: 'solana',
    tokenId: 'So1...xyz',
  },
];

const Bridge = () => {
  const { isConnected } = useAccount();
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [sourceChain, setSourceChain] = useState('');
  const [targetChain, setTargetChain] = useState('');
  const [isBridging, setIsBridging] = useState(false);
  const [bridgeStatus, setBridgeStatus] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleBridge = async () => {
    if (!selectedNFT || !sourceChain || !targetChain) return;

    setIsBridging(true);
    setBridgeStatus('initiating');

    try {
      // Simulate bridge process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setBridgeStatus('processing');
      await new Promise(resolve => setTimeout(resolve, 3000));
      setBridgeStatus('completed');
    } catch (error) {
      setBridgeStatus('failed');
      console.error('Bridge error:', error);
    } finally {
      setIsBridging(false);
    }
  };

  const getStatusIcon = () => {
    switch (bridgeStatus) {
      case 'initiating':
        return <ArrowPathIcon className="h-8 w-8 text-primary-500 animate-spin" />;
      case 'processing':
        return <ArrowPathIcon className="h-8 w-8 text-primary-500 animate-spin" />;
      case 'completed':
        return <CheckCircleIcon className="h-8 w-8 text-green-500" />;
      case 'failed':
        return <ExclamationCircleIcon className="h-8 w-8 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusMessage = () => {
    switch (bridgeStatus) {
      case 'initiating':
        return 'Initiating bridge transaction...';
      case 'processing':
        return 'Processing your NFT transfer...';
      case 'completed':
        return 'NFT successfully bridged!';
      case 'failed':
        return 'Bridge transaction failed. Please try again.';
      default:
        return '';
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
            <p className="text-gray-400 mb-8">
              Please connect your wallet to bridge NFTs
            </p>
            <ConnectButton />
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-4xl font-bold mb-4">Bridge Your NFTs</h1>
            <p className="text-gray-400">
              Transfer your NFTs between different blockchains seamlessly
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* NFT Selection */}
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-6">Select NFT to Bridge</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sampleNFTs.map((nft) => (
                  <motion.div
                    key={nft.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative rounded-lg overflow-hidden cursor-pointer ${
                      selectedNFT?.id === nft.id ? 'ring-2 ring-primary-500' : ''
                    }`}
                    onClick={() => setSelectedNFT(nft)}
                  >
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-medium">{nft.name}</h3>
                        <p className="text-gray-300 text-sm">{nft.chain}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bridge Configuration */}
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-6">Bridge Configuration</h2>
              
              {/* Source Chain */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">From Chain</label>
                <select
                  value={sourceChain}
                  onChange={(e) => setSourceChain(e.target.value)}
                  className="input-primary w-full"
                  disabled={!selectedNFT}
                >
                  <option value="">Select source chain</option>
                  {supportedChains.map((chain) => (
                    <option key={chain.id} value={chain.id}>
                      {chain.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bridge Animation */}
              <div className="flex justify-center items-center my-8">
                <motion.div
                  animate={{
                    x: [0, 10, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowsRightLeftIcon className="h-8 w-8 text-primary-500" />
                </motion.div>
              </div>

              {/* Target Chain */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">To Chain</label>
                <select
                  value={targetChain}
                  onChange={(e) => setTargetChain(e.target.value)}
                  className="input-primary w-full"
                  disabled={!selectedNFT || !sourceChain}
                >
                  <option value="">Select target chain</option>
                  {supportedChains
                    .filter((chain) => chain.id !== sourceChain)
                    .map((chain) => (
                      <option key={chain.id} value={chain.id}>
                        {chain.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Bridge Status */}
              {bridgeStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-lg bg-gray-800/50"
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon()}
                    <p className="text-sm">{getStatusMessage()}</p>
                  </div>
                </motion.div>
              )}

              {/* Bridge Button */}
              <button
                onClick={handleBridge}
                disabled={!selectedNFT || !sourceChain || !targetChain || isBridging}
                className={`btn-primary w-full mt-6 ${
                  (!selectedNFT || !sourceChain || !targetChain || isBridging) &&
                  'opacity-50 cursor-not-allowed'
                }`}
              >
                {isBridging ? (
                  <span className="flex items-center justify-center">
                    <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" />
                    Bridging...
                  </span>
                ) : (
                  'Bridge NFT'
                )}
              </button>
            </div>
          </div>

          {/* Supported Chains */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Supported Chains</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportedChains.map((chain) => (
                <motion.div
                  key={chain.id}
                  whileHover={{ scale: 1.02 }}
                  className="glass p-6 rounded-xl"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={chain.icon}
                      alt={chain.name}
                      className="w-12 h-12"
                    />
                    <div>
                      <h3 className="font-semibold">{chain.name}</h3>
                      <p className="text-sm text-gray-400">{chain.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Bridge; 