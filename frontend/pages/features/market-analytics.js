import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  FilterIcon,
  ArrowDownTrayIcon,
  DocumentChartBarIcon,
  ChartPieIcon,
  UserGroupIcon,
  CubeIcon,
  BoltIcon,
  CurrencyDollarIcon as CurrencyIcon,
} from '@heroicons/react/24/outline';

// Sample data for charts and analytics
const timeRanges = ['24h', '7d', '30d', '90d', '1y', 'All'];
const categories = ['All', 'Generative', 'Photography', 'Illustration', '3D', 'Video'];

const sampleNFTs = [
  {
    id: 1,
    name: 'Cosmic Nebula #42',
    image: '/sample-nft-1.jpg',
    price: 1.25,
    change: 15.4,
    volume: 3.2,
    sales: 5,
    likes: 128,
  },
  {
    id: 2,
    name: 'Geometric Pattern #17',
    image: '/sample-nft-2.jpg',
    price: 0.85,
    change: -5.2,
    volume: 1.8,
    sales: 3,
    likes: 92,
  },
  {
    id: 3,
    name: 'Abstract Flow #93',
    image: '/sample-nft-3.jpg',
    price: 2.1,
    change: 8.7,
    volume: 4.5,
    sales: 7,
    likes: 156,
  },
  {
    id: 4,
    name: 'Digital Landscape #31',
    image: '/sample-nft-4.jpg',
    price: 1.5,
    change: 12.3,
    volume: 2.9,
    sales: 4,
    likes: 103,
  },
  {
    id: 5,
    name: 'Pixel Art #78',
    image: '/sample-nft-5.jpg',
    price: 0.95,
    change: -2.1,
    volume: 1.2,
    sales: 2,
    likes: 87,
  },
];

const performanceData = {
  totalValue: 12.5,
  valueChange: 8.3,
  totalVolume: 25.7,
  volumeChange: 12.5,
  totalSales: 42,
  salesChange: 5.2,
  averagePrice: 1.8,
  priceChange: 3.7,
};

export default function MarketAnalytics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('overview');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleTimeRangeChange = (range) => {
    setSelectedTimeRange(range);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const formatNumber = (num) => {
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const formatPercentage = (percentage) => {
    return `${percentage > 0 ? '+' : ''}${percentage.toFixed(1)}%`;
  };

  return (
    <div className="min-h-screen text-white">
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
              Market Analytics
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Track your NFT performance with detailed analytics
            </p>
            
            {/* Interactive Blockchain Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <motion.div 
                className="glass p-4 rounded-xl flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CubeIcon className="h-8 w-8 text-primary-500" />
                <div>
                  <p className="text-sm text-gray-400">Total Blocks</p>
                  <p className="text-xl font-bold">1,248,593</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="glass p-4 rounded-xl flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BoltIcon className="h-8 w-8 text-secondary-500" />
                <div>
                  <p className="text-sm text-gray-400">Transactions</p>
                  <p className="text-xl font-bold">3.2M</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="glass p-4 rounded-xl flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CurrencyIcon className="h-8 w-8 text-accent-500" />
                <div>
                  <p className="text-sm text-gray-400">Market Cap</p>
                  <p className="text-xl font-bold">$42.5M</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="glass p-2 rounded-xl mb-8 flex flex-wrap gap-2">
          <button 
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'overview' 
                ? 'bg-primary-600 text-white' 
                : 'hover:bg-gray-800'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'performance' 
                ? 'bg-primary-600 text-white' 
                : 'hover:bg-gray-800'
            }`}
            onClick={() => setActiveTab('performance')}
          >
            Performance
          </button>
          <button 
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'trends' 
                ? 'bg-primary-600 text-white' 
                : 'hover:bg-gray-800'
            }`}
            onClick={() => setActiveTab('trends')}
          >
            Trends
          </button>
          <button 
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'reports' 
                ? 'bg-primary-600 text-white' 
                : 'hover:bg-gray-800'
            }`}
            onClick={() => setActiveTab('reports')}
          >
            Reports
          </button>
        </div>
        
        {/* Filters */}
        <div className="glass p-6 rounded-xl mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary-500" />
              <span className="font-medium">Time Range:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => handleTimeRangeChange(range)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTimeRange === range
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <FilterIcon className="h-5 w-5 text-primary-500" />
              <span className="font-medium">Category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass p-6 rounded-xl"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-400">Total Value</h3>
                <p className="text-2xl font-bold mt-1">{formatPrice(performanceData.totalValue)}</p>
              </div>
              <div className={`flex items-center ${
                performanceData.valueChange >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {performanceData.valueChange >= 0 ? (
                  <ArrowTrendingUpIcon className="h-5 w-5 mr-1" />
                ) : (
                  <ArrowTrendingDownIcon className="h-5 w-5 mr-1" />
                )}
                <span>{formatPercentage(performanceData.valueChange)}</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass p-6 rounded-xl"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-400">Total Volume</h3>
                <p className="text-2xl font-bold mt-1">{formatPrice(performanceData.totalVolume)}</p>
              </div>
              <div className={`flex items-center ${
                performanceData.volumeChange >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {performanceData.volumeChange >= 0 ? (
                  <ArrowTrendingUpIcon className="h-5 w-5 mr-1" />
                ) : (
                  <ArrowTrendingDownIcon className="h-5 w-5 mr-1" />
                )}
                <span>{formatPercentage(performanceData.volumeChange)}</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass p-6 rounded-xl"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-400">Total Sales</h3>
                <p className="text-2xl font-bold mt-1">{performanceData.totalSales}</p>
              </div>
              <div className={`flex items-center ${
                performanceData.salesChange >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {performanceData.salesChange >= 0 ? (
                  <ArrowTrendingUpIcon className="h-5 w-5 mr-1" />
                ) : (
                  <ArrowTrendingDownIcon className="h-5 w-5 mr-1" />
                )}
                <span>{formatPercentage(performanceData.salesChange)}</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass p-6 rounded-xl"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-400">Average Price</h3>
                <p className="text-2xl font-bold mt-1">{formatPrice(performanceData.averagePrice)}</p>
              </div>
              <div className={`flex items-center ${
                performanceData.priceChange >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {performanceData.priceChange >= 0 ? (
                  <ArrowTrendingUpIcon className="h-5 w-5 mr-1" />
                ) : (
                  <ArrowTrendingDownIcon className="h-5 w-5 mr-1" />
                )}
                <span>{formatPercentage(performanceData.priceChange)}</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass p-6 rounded-xl"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Price History</h2>
              <button className="p-1 rounded hover:bg-gray-700">
                <ArrowDownTrayIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="bg-gray-800 rounded-lg h-64 flex items-center justify-center">
              <ChartBarIcon className="h-16 w-16 text-gray-600" />
              <span className="ml-2 text-gray-500">Price chart visualization</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass p-6 rounded-xl"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Sales Distribution</h2>
              <button className="p-1 rounded hover:bg-gray-700">
                <ArrowDownTrayIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="bg-gray-800 rounded-lg h-64 flex items-center justify-center">
              <ChartPieIcon className="h-16 w-16 text-gray-600" />
              <span className="ml-2 text-gray-500">Sales distribution chart</span>
            </div>
          </motion.div>
        </div>
        
        {/* NFT Performance Table */}
        <div className="glass p-6 rounded-xl mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">NFT Performance</h2>
            <button className="btn-secondary flex items-center gap-2">
              <ArrowDownTrayIcon className="h-5 w-5" />
              Export Data
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="pb-3 font-medium text-gray-400">NFT</th>
                  <th className="pb-3 font-medium text-gray-400">Price</th>
                  <th className="pb-3 font-medium text-gray-400">Change</th>
                  <th className="pb-3 font-medium text-gray-400">Volume</th>
                  <th className="pb-3 font-medium text-gray-400">Sales</th>
                  <th className="pb-3 font-medium text-gray-400">Likes</th>
                </tr>
              </thead>
              <tbody>
                {sampleNFTs.map((nft) => (
                  <tr key={nft.id} className="border-b border-gray-800">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-800">
                          <img 
                            src={nft.image} 
                            alt={nft.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span>{nft.name}</span>
                      </div>
                    </td>
                    <td className="py-4">{formatPrice(nft.price)}</td>
                    <td className={`py-4 ${
                      nft.change >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {formatPercentage(nft.change)}
                    </td>
                    <td className="py-4">{formatPrice(nft.volume)}</td>
                    <td className="py-4">{nft.sales}</td>
                    <td className="py-4">{nft.likes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="mt-16" ref={ref}>
          <h2 className="text-3xl font-bold mb-8 text-center">Analytics Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass p-6 rounded-xl"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <ChartBarIcon className="h-10 w-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Performance Tracking</h3>
              <p className="text-gray-400">
                Monitor your NFT collection's value, volume, and sales over time.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass p-6 rounded-xl"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <DocumentChartBarIcon className="h-10 w-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Detailed Reports</h3>
              <p className="text-gray-400">
                Generate comprehensive reports on your NFT performance and market trends.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass p-6 rounded-xl"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <UserGroupIcon className="h-10 w-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Market Insights</h3>
              <p className="text-gray-400">
                Gain valuable insights into market trends and collector behavior.
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
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
              <p className="text-gray-400">
                Connect your wallet to track all your NFTs in one place.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass p-6 rounded-xl"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">View Analytics</h3>
              <p className="text-gray-400">
                Explore detailed analytics and performance metrics for your NFTs.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass p-6 rounded-xl"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Make Informed Decisions</h3>
              <p className="text-gray-400">
                Use market insights to make strategic decisions about your NFT collection.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-16">
          <div className="glass rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Track Your NFTs?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Connect your wallet and start tracking your NFT performance with detailed analytics.
            </p>
            <Link href="/gallery">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-8 py-3 text-lg"
              >
                View Analytics
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 