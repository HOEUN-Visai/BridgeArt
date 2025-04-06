import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateNFT from '../pages/create';

// Mock the API calls
jest.mock('../pages/api/generate', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({ 
    success: true, 
    imageUrl: 'https://example.com/generated-image.jpg' 
  }))
}));

jest.mock('../pages/api/mint', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({ 
    success: true, 
    transactionHash: '0x1234567890abcdef' 
  }))
}));

describe('Create NFT Page', () => {
  test('renders create NFT form', () => {
    render(<CreateNFT />);
    
    // Check for the title
    const titleElement = screen.getByText(/Create Your NFT/i);
    expect(titleElement).toBeInTheDocument();
    
    // Check for the prompt input
    const promptInput = screen.getByPlaceholderText(/Enter your prompt/i);
    expect(promptInput).toBeInTheDocument();
    
    // Check for the generate button
    const generateButton = screen.getByText(/Generate Artwork/i);
    expect(generateButton).toBeInTheDocument();
  });
  
  test('handles prompt submission', async () => {
    render(<CreateNFT />);
    
    // Get the prompt input and generate button
    const promptInput = screen.getByPlaceholderText(/Enter your prompt/i);
    const generateButton = screen.getByText(/Generate Artwork/i);
    
    // Enter a prompt
    fireEvent.change(promptInput, { target: { value: 'A serene landscape with mountains' } });
    
    // Click the generate button
    fireEvent.click(generateButton);
    
    // Check for loading state
    const loadingElement = screen.getByText(/Generating artwork/i);
    expect(loadingElement).toBeInTheDocument();
    
    // Wait for the API call to complete
    await waitFor(() => {
      expect(screen.getByText(/Artwork generated/i)).toBeInTheDocument();
    });
    
    // Check for the generated image
    const generatedImage = screen.getByAltText(/Generated artwork/i);
    expect(generatedImage).toBeInTheDocument();
    expect(generatedImage.src).toContain('https://example.com/generated-image.jpg');
    
    // Check for the mint button
    const mintButton = screen.getByText(/Mint NFT on Solana/i);
    expect(mintButton).toBeInTheDocument();
  });
  
  test('handles minting process', async () => {
    render(<CreateNFT />);
    
    // Mock the wallet connection
    global.window.ethereum = {
      request: jest.fn(() => Promise.resolve(['0x1234567890abcdef']))
    };
    
    // Get the prompt input and generate button
    const promptInput = screen.getByPlaceholderText(/Enter your prompt/i);
    const generateButton = screen.getByText(/Generate Artwork/i);
    
    // Enter a prompt and generate artwork
    fireEvent.change(promptInput, { target: { value: 'A serene landscape with mountains' } });
    fireEvent.click(generateButton);
    
    // Wait for the artwork to be generated
    await waitFor(() => {
      expect(screen.getByText(/Artwork generated/i)).toBeInTheDocument();
    });
    
    // Click the mint button
    const mintButton = screen.getByText(/Mint NFT on Solana/i);
    fireEvent.click(mintButton);
    
    // Check for minting state
    const mintingElement = screen.getByText(/Minting NFT/i);
    expect(mintingElement).toBeInTheDocument();
    
    // Wait for the minting process to complete
    await waitFor(() => {
      expect(screen.getByText(/NFT minted successfully/i)).toBeInTheDocument();
    });
    
    // Check for the transaction hash
    const transactionElement = screen.getByText(/Transaction Hash:/i);
    expect(transactionElement).toBeInTheDocument();
    expect(screen.getByText(/0x1234567890abcdef/i)).toBeInTheDocument();
  });
}); 