import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { 
  PhotoIcon, 
  SparklesIcon, 
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

const CreateNFT = () => {
  const { isConnected } = useAccount();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    attributes: [],
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [preview, setPreview] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file
        }));
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setPreview('/sample-nft.jpg'); // Replace with actual generated image
    setIsGenerating(false);
    setStep(2);
  };

  const handleMint = async () => {
    // Implement minting logic here
    console.log('Minting NFT with data:', formData);
  };

  const steps = [
    {
      title: 'Connect Wallet',
      description: 'Connect your wallet to start creating NFTs',
      component: (
        <div className="text-center">
          <ConnectButton />
        </div>
      ),
    },
    {
      title: 'Create Your NFT',
      description: 'Upload an image or generate one using AI',
      component: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-primary w-full"
                  placeholder="Enter NFT name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="input-primary w-full h-32"
                  placeholder="Describe your NFT"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Upload Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-medium mb-4">Or Generate with AI</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Let our AI create a unique artwork based on your description.
                  </p>
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    {isGenerating ? (
                      <>
                        <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <SparklesIcon className="h-5 w-5 mr-2" />
                        Generate Artwork
                      </>
                    )}
                  </button>
                </div>
                {preview && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Preview</h3>
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <img
                        src={preview}
                        alt="NFT Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setStep(3)}
              disabled={!formData.name || !formData.description || (!formData.image && !preview)}
              className="btn-primary"
            >
              Continue
            </button>
          </div>
        </div>
      ),
    },
    {
      title: 'Review & Mint',
      description: 'Review your NFT details and mint it on the blockchain',
      component: (
        <div className="space-y-6">
          <div className="glass p-6 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">NFT Details</h3>
                <div>
                  <p className="text-sm text-gray-400">Name</p>
                  <p className="font-medium">{formData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Description</p>
                  <p className="font-medium">{formData.description}</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Preview</h3>
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src={preview}
                    alt="NFT Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="btn-secondary"
            >
              Back
            </button>
            <button
              onClick={handleMint}
              className="btn-primary"
            >
              Mint NFT
            </button>
          </div>
        </div>
      ),
    },
  ];

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
            <p className="text-gray-400 mb-8">
              Please connect your wallet to start creating NFTs
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
            <h1 className="text-3xl font-bold mb-4">Create Your NFT</h1>
            <p className="text-gray-400">
              Follow the steps below to create and mint your unique NFT
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {steps.map((s, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step > index + 1
                        ? 'bg-primary-500'
                        : step === index + 1
                        ? 'bg-primary-500'
                        : 'bg-gray-700'
                    }`}
                  >
                    {step > index + 1 ? (
                      <CheckCircleIcon className="h-5 w-5 text-white" />
                    ) : (
                      <span className="text-white">{index + 1}</span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-24 h-1 ${
                        step > index + 1 ? 'bg-primary-500' : 'bg-gray-700'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass p-8 rounded-xl"
            >
              <h2 className="text-2xl font-bold mb-2">{steps[step - 1].title}</h2>
              <p className="text-gray-400 mb-6">{steps[step - 1].description}</p>
              {steps[step - 1].component}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateNFT; 