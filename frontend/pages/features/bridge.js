import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
  ArrowsRightLeftIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';

const supportedChains = [
  { id: 'ethereum', name: 'Ethereum', icon: '/chain-icons/ethereum.svg' },
  { id: 'polygon', name: 'Polygon', icon: '/chain-icons/polygon.svg' },
  { id: 'binance', name: 'BNB Chain', icon: '/chain-icons/binance.svg' },
  { id: 'avalanche', name: 'Avalanche', icon: '/chain-icons/avalanche.svg' },
  { id: 'arbitrum', name: 'Arbitrum', icon: '/chain-icons/arbitrum.svg' },
  { id: 'optimism', name: 'Optimism', icon: '/chain-icons/optimism.svg' },
];

const sampleNFTs = [
  {
    id: 1,
    name: 'Cosmic Nebula #42',
    image: '/sample-nft-1.jpg',
    chain: 'ethereum',
    tokenId: '0x1234...5678',
  },
  {
    id: 2,
    name: 'Geometric Pattern #17',
    image: '/sample-nft-2.jpg',
    chain: 'polygon',
    tokenId: '0x8765...4321',
  },
  {
    id: 3,
    name: 'Abstract Flow #93',
    image: '/sample-nft-3.jpg',
    chain: 'binance',
    tokenId: '0xabcd...efgh',
  },
];

export default function Bridge() {
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [targetChain, setTargetChain] = useState('');
  const [isBridging, setIsBridging] = useState(false);
  const [bridgeStatus, setBridgeStatus] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleNFTSelect = (nft) => {
    setSelectedNFT(nft);
    setBridgeStatus(null);
  };

  const handleChainSelect = (chainId) => {
    setTargetChain(chainId);
  };

  const handleBridge = () => {
    if (!selectedNFT || !targetChain) return;
    
    setIsBridging(true);
    setBridgeStatus({ status: 'processing', message: 'Initiating bridge transaction...' });
    
    // Simulate bridging process
    setTimeout(() => {
      setBridgeStatus({ status: 'processing', message: 'Confirming transaction on source chain...' });
      
      setTimeout(() => {
        setBridgeStatus({ status: 'processing', message: 'Creating wrapped NFT on target chain...' });
        
        setTimeout(() => {
          setIsBridging(false);
          setBridgeStatus({ 
            status: 'success', 
            message: `Successfully bridged ${selectedNFT.name} to ${supportedChains.find(c => c.id === targetChain)?.name}!` 
          });
        }, 2000);
      }, 2000);
    }, 2000);
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
              Cross-Chain NFT Bridge
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Seamlessly transfer your NFTs between different blockchains
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* NFT Selection */}
          <div className="lg:col-span-1">
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-6">Your NFTs</h2>
              
              <div className="space-y-4">
                {sampleNFTs.map((nft) => (
                  <div 
                    key={nft.id}
                    onClick={() => handleNFTSelect(nft)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedNFT?.id === nft.id
                        ? 'bg-primary-600/30 border border-primary-500'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <img 
                          src={nft.image} 
                          alt={nft.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{nft.name}</h3>
                        <p className="text-sm text-gray-400">
                          {supportedChains.find(c => c.id === nft.chain)?.name}
                        </p>
                        <p className="text-xs text-gray-500">{nft.tokenId}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Bridge Controls */}
          <div className="lg:col-span-2">
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-6">Bridge Controls</h2>
              
              {selectedNFT ? (
                <>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Selected NFT</h3>
                    <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
                      <div className="w-20 h-20 rounded-lg overflow-hidden">
                        <img 
                          src={selectedNFT.image} 
                          alt={selectedNFT.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{selectedNFT.name}</h3>
                        <p className="text-sm text-gray-400">
                          Currently on {supportedChains.find(c => c.id === selectedNFT.chain)?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Select Target Chain</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {supportedChains
                        .filter(chain => chain.id !== selectedNFT.chain)
                        .map((chain) => (
                          <button
                            key={chain.id}
                            onClick={() => handleChainSelect(chain.id)}
                            className={`p-3 rounded-lg text-center transition-all ${
                              targetChain === chain.id
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-800 hover:bg-gray-700'
                            }`}
                          >
                            {chain.name}
                          </button>
                        ))}
                    </div>
                  </div>
                  
                  {bridgeStatus && (
                    <div className={`mb-6 p-4 rounded-lg ${
                      bridgeStatus.status === 'success' 
                        ? 'bg-green-900/30 border border-green-500' 
                        : 'bg-blue-900/30 border border-blue-500'
                    }`}>
                      <div className="flex items-center gap-3">
                        {bridgeStatus.status === 'success' ? (
                          <CheckCircleIcon className="h-6 w-6 text-green-500" />
                        ) : (
                          <ArrowPathIcon className="h-6 w-6 text-blue-500 animate-spin" />
                        )}
                        <p>{bridgeStatus.message}</p>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={handleBridge}
                    disabled={isBridging || !targetChain}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    {isBridging ? (
                      <>
                        <ArrowPathIcon className="h-5 w-5 animate-spin" />
                        Bridging...
                      </>
                    ) : (
                      <>
                        <ArrowsRightLeftIcon className="h-5 w-5" />
                        Bridge NFT
                      </>
                    )}
                  </button>
                </>
              ) : (
                <div className="text-center py-8">
                  <ExclamationTriangleIcon className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">Select an NFT to bridge to another chain</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Supported Chains */}
        <div className="mt-16" ref={ref}>
          <h2 className="text-3xl font-bold mb-8 text-center">Supported Blockchains</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {supportedChains.map((chain) => (
              <motion.div
                key={chain.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass p-6 rounded-xl text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                  <img 
                    src={chain.icon} 
                    alt={chain.name} 
                    className="w-10 h-10"
                  />
                </div>
                <h3 className="text-lg font-medium">{chain.name}</h3>
              </motion.div>
            ))}
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
              <h3 className="text-xl font-semibold mb-2">Select Your NFT</h3>
              <p className="text-gray-400">
                Choose the NFT you want to bridge from your wallet.
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
              <h3 className="text-xl font-semibold mb-2">Choose Destination</h3>
              <p className="text-gray-400">
                Select the blockchain you want to bridge your NFT to.
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
              <h3 className="text-xl font-semibold mb-2">Complete Bridge</h3>
              <p className="text-gray-400">
                Confirm the transaction and your NFT will be bridged to the new chain.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-16">
          <div className="glass rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Bridge Your NFTs?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Connect your wallet and start bridging your NFTs between different blockchains with ease.
            </p>
            <Link href="/bridge">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-8 py-3 text-lg"
              >
                Start Bridging
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 