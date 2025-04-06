// Simple test script to verify frontend components
const fs = require('fs');
const path = require('path');

// Check if required files exist
const requiredFiles = [
  'pages/index.js',
  'pages/create.js',
  'pages/_app.js',
  'components/Navbar.js',
  'pages/api/generate.js',
  'pages/api/mint.js',
  'styles/globals.css',
  'tailwind.config.js',
  'postcss.config.js',
  'next.config.js',
  'package.json',
  'Dockerfile'
];

console.log('Checking frontend files...');

let allFilesExist = true;
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  const exists = fs.existsSync(filePath);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allFilesExist = false;
});

// Check package.json dependencies
if (fs.existsSync(path.join(__dirname, 'package.json'))) {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  console.log('\nChecking dependencies...');
  
  const requiredDependencies = [
    'next',
    'react',
    'react-dom',
    '@rainbow-me/rainbowkit',
    'wagmi',
    '@solana/web3.js',
    '@metaplex-foundation/js',
    'openai',
    'tailwindcss',
    'autoprefixer',
    'postcss'
  ];
  
  let allDependenciesExist = true;
  requiredDependencies.forEach(dep => {
    const exists = packageJson.dependencies && packageJson.dependencies[dep];
    console.log(`${exists ? '✅' : '❌'} ${dep}`);
    if (!exists) allDependenciesExist = false;
  });
  
  console.log('\nSummary:');
  console.log(`Files: ${allFilesExist ? '✅ All required files exist' : '❌ Some files are missing'}`);
  console.log(`Dependencies: ${allDependenciesExist ? '✅ All required dependencies exist' : '❌ Some dependencies are missing'}`);
} else {
  console.log('\n❌ package.json not found');
}

console.log('\nTo test the frontend:');
console.log('1. Run: docker-compose up --build');
console.log('2. Open http://localhost:3000 in your browser');
console.log('3. Test the following features:');
console.log('   - Wallet connection');
console.log('   - NFT creation with AI');
console.log('   - NFT minting on Solana'); 