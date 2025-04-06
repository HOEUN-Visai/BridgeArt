import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected } = useAccount();

  return (
    <nav className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold">BridgeArt</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/create" className="hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium">
                  Create NFT
                </Link>
                <Link href="/gallery" className="hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium">
                  Gallery
                </Link>
                <Link href="/bridge" className="hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium">
                  Bridge NFTs
                </Link>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <ConnectButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-purple-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/create" className="block hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium">
              Create NFT
            </Link>
            <Link href="/gallery" className="block hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium">
              Gallery
            </Link>
            <Link href="/bridge" className="block hover:bg-purple-700 px-3 py-2 rounded-md text-base font-medium">
              Bridge NFTs
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 