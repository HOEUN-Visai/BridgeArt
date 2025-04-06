import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
  CodeBracketIcon,
  PlayIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon,
  CpuChipIcon,
  CommandLineIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline';

const sampleAlgorithms = [
  {
    id: 'fractal-tree',
    name: 'Fractal Tree',
    description: 'Generate a recursive fractal tree with customizable parameters',
    code: `function drawTree(x, y, angle, depth) {
  if (depth === 0) return;
  
  const length = depth * 10;
  const newX = x + length * Math.cos(angle);
  const newY = y + length * Math.sin(angle);
  
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(newX, newY);
  ctx.stroke();
  
  drawTree(newX, newY, angle - 0.5, depth - 1);
  drawTree(newX, newY, angle + 0.5, depth - 1);
}

// Start with a trunk
drawTree(width/2, height, -Math.PI/2, 10);`,
  },
  {
    id: 'perlin-flow',
    name: 'Perlin Flow Field',
    description: 'Create a flowing field using Perlin noise',
    code: `function setup() {
  noiseSeed(random(10000));
}

function draw() {
  loadPixels();
  
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const angle = noise(x * 0.01, y * 0.01) * TWO_PI * 2;
      const brightness = noise(x * 0.02, y * 0.02) * 255;
      
      const index = (x + y * width) * 4;
      pixels[index] = brightness;
      pixels[index + 1] = brightness;
      pixels[index + 2] = brightness;
      pixels[index + 3] = 255;
    }
  }
  
  updatePixels();
  noLoop();
}`,
  },
  {
    id: 'cellular-automata',
    name: 'Cellular Automata',
    description: 'Generate patterns using cellular automata rules',
    code: `let grid = [];
let nextGrid = [];
const cellSize = 10;
const cols = width / cellSize;
const rows = height / cellSize;

function setup() {
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    nextGrid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = random() > 0.5 ? 1 : 0;
      nextGrid[i][j] = 0;
    }
  }
}

function draw() {
  background(0);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * cellSize;
      const y = j * cellSize;
      
      if (grid[i][j] === 1) {
        fill(255);
      } else {
        fill(0);
      }
      
      rect(x, y, cellSize, cellSize);
    }
  }
  
  // Apply rules
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const neighbors = countNeighbors(i, j);
      
      if (grid[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
        nextGrid[i][j] = 0;
      } else if (grid[i][j] === 0 && neighbors === 3) {
        nextGrid[i][j] = 1;
      } else {
        nextGrid[i][j] = grid[i][j];
      }
    }
  }
  
  // Swap grids
  const temp = grid;
  grid = nextGrid;
  nextGrid = temp;
}`,
  },
];

export default function CustomAlgorithms() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(sampleAlgorithms[0]);
  const [code, setCode] = useState(sampleAlgorithms[0].code);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    setCode(selectedAlgorithm.code);
  }, [selectedAlgorithm]);

  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    setIsRunning(false);
    setOutput('');
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput('Running algorithm...');
    
    // Simulate algorithm execution
    setTimeout(() => {
      setOutput('Algorithm executed successfully!');
      setIsRunning(false);
    }, 2000);
  };

  const handleDeploy = () => {
    // Simulate deployment
    setOutput('Deploying algorithm to blockchain...');
    
    setTimeout(() => {
      setOutput('Algorithm deployed successfully! You can now use it to generate NFTs.');
    }, 3000);
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
              Custom Algorithms
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Write and deploy your own generative art algorithms
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Algorithm Selection */}
          <div className="lg:col-span-1">
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-6">Sample Algorithms</h2>
              
              <div className="space-y-4">
                {sampleAlgorithms.map((algorithm) => (
                  <button
                    key={algorithm.id}
                    onClick={() => handleAlgorithmChange(algorithm)}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      selectedAlgorithm.id === algorithm.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <h3 className="font-medium">{algorithm.name}</h3>
                    <p className="text-sm text-gray-300 mt-1">
                      {algorithm.description}
                    </p>
                  </button>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-3">Algorithm Output</h3>
                <div className="bg-gray-800 p-4 rounded-lg min-h-[100px]">
                  {output || 'Run an algorithm to see the output here'}
                </div>
              </div>
              
              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  {isRunning ? (
                    <>
                      <ArrowPathIcon className="h-5 w-5 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <PlayIcon className="h-5 w-5" />
                      Run Algorithm
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleDeploy}
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <CpuChipIcon className="h-5 w-5" />
                  Deploy to Blockchain
                </button>
              </div>
            </div>
          </div>
          
          {/* Code Editor */}
          <div className="lg:col-span-2">
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-6">Algorithm Editor</h2>
              
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CodeBracketIcon className="h-5 w-5 text-primary-500" />
                    <span>{selectedAlgorithm.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1 rounded hover:bg-gray-700">
                      <DocumentTextIcon className="h-4 w-4" />
                    </button>
                    <button className="p-1 rounded hover:bg-gray-700">
                      <ArrowDownTrayIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <textarea
                  value={code}
                  onChange={handleCodeChange}
                  className="w-full h-[500px] bg-gray-900 p-4 font-mono text-sm focus:outline-none"
                  spellCheck="false"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="mt-16" ref={ref}>
          <h2 className="text-3xl font-bold mb-8 text-center">Algorithm Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass p-6 rounded-xl"
            >
              <CommandLineIcon className="h-10 w-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Custom Code</h3>
              <p className="text-gray-400">
                Write your own algorithms using JavaScript with access to canvas and WebGL APIs.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass p-6 rounded-xl"
            >
              <BeakerIcon className="h-10 w-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Test & Preview</h3>
              <p className="text-gray-400">
                Run your algorithms in real-time and see the results immediately.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass p-6 rounded-xl"
            >
              <CpuChipIcon className="h-10 w-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Blockchain Deployment</h3>
              <p className="text-gray-400">
                Deploy your algorithms to the blockchain for others to use in NFT creation.
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
              <h3 className="text-xl font-semibold mb-2">Write Your Algorithm</h3>
              <p className="text-gray-400">
                Use our code editor to write your generative art algorithm in JavaScript.
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
              <h3 className="text-xl font-semibold mb-2">Test & Refine</h3>
              <p className="text-gray-400">
                Run your algorithm and refine it until you're happy with the results.
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
              <h3 className="text-xl font-semibold mb-2">Deploy & Share</h3>
              <p className="text-gray-400">
                Deploy your algorithm to the blockchain and let others use it to create NFTs.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-16">
          <div className="glass rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Your Algorithm?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Start writing your own generative art algorithms and deploy them to the blockchain.
            </p>
            <Link href="/create">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-8 py-3 text-lg"
              >
                Start Coding
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 