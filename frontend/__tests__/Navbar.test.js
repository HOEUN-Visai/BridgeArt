import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';

test('renders BridgeArt logo', () => {
  render(<Navbar />);
  const logoElement = screen.getByText(/BridgeArt/i);
  expect(logoElement).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(<Navbar />);
  
  // Check for Create NFT link
  const createLink = screen.getByText(/Create NFT/i);
  expect(createLink).toBeInTheDocument();
  
  // Check for Gallery link
  const galleryLink = screen.getByText(/Gallery/i);
  expect(galleryLink).toBeInTheDocument();
  
  // Check for Bridge NFTs link
  const bridgeLink = screen.getByText(/Bridge NFTs/i);
  expect(bridgeLink).toBeInTheDocument();
});

test('renders connect wallet button', () => {
  render(<Navbar />);
  const connectButton = screen.getByText(/Connect Wallet/i);
  expect(connectButton).toBeInTheDocument();
}); 