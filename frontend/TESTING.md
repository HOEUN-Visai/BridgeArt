# BridgeArt Frontend Testing Guide

This guide provides instructions for testing the BridgeArt frontend application.

## Prerequisites

- Docker and Docker Compose installed
- A Solana wallet (like Phantom)
- An OpenAI API key (for AI art generation)

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/bridgeart.git
   cd bridgeart
   ```

2. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file and add your OpenAI API key:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. Start the application:

   ```bash
   docker-compose up --build
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Manual Testing

### 1. Home Page

- [ ] Verify that the home page loads correctly
- [ ] Check that the navigation links work (Create NFT, Gallery, Bridge NFTs)
- [ ] Verify that the "How It Works" section is displayed correctly

### 2. Wallet Connection

- [ ] Click on the "Connect Wallet" button
- [ ] Verify that the wallet connection modal appears
- [ ] Connect your Solana wallet
- [ ] Verify that the wallet address is displayed in the navbar

### 3. NFT Creation

- [ ] Navigate to the Create NFT page
- [ ] Enter a prompt in the text area (e.g., "A serene landscape with mountains and a lake at sunset")
- [ ] Click the "Generate Artwork" button
- [ ] Verify that the loading spinner appears
- [ ] Wait for the AI to generate the artwork
- [ ] Verify that the generated image is displayed
- [ ] Click the "Mint NFT on Solana" button
- [ ] Verify that the minting process starts
- [ ] Confirm the transaction in your wallet
- [ ] Verify that the NFT is minted successfully

### 4. Gallery

- [ ] Navigate to the Gallery page
- [ ] Verify that your minted NFTs are displayed
- [ ] Check that the NFT details (name, description, image) are correct

### 5. NFT Bridging

- [ ] Navigate to the Bridge NFTs page
- [ ] Select an NFT to bridge
- [ ] Choose a destination blockchain (Ethereum, Bitcoin)
- [ ] Click the "Bridge NFT" button
- [ ] Verify that the bridging process starts
- [ ] Confirm the transaction in your wallet
- [ ] Verify that the NFT is bridged successfully

## Automated Testing

For automated testing, you can use the following tools:

### Jest and React Testing Library

1. Install the testing dependencies:

   ```bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
   ```

2. Create a test file for a component:

   ```bash
   touch __tests__/Navbar.test.js
   ```

3. Write a test for the Navbar component:

   ```javascript
   import { render, screen } from "@testing-library/react";
   import Navbar from "../components/Navbar";

   test("renders BridgeArt logo", () => {
     render(<Navbar />);
     const logoElement = screen.getByText(/BridgeArt/i);
     expect(logoElement).toBeInTheDocument();
   });
   ```

4. Run the tests:
   ```bash
   npm test
   ```

### Cypress for End-to-End Testing

1. Install Cypress:

   ```bash
   npm install --save-dev cypress
   ```

2. Create a Cypress test:

   ```bash
   npx cypress open
   ```

3. Create a test file for the NFT creation flow:

   ```javascript
   describe("NFT Creation", () => {
     it("should create an NFT", () => {
       cy.visit("/create");
       cy.get("textarea").type(
         "A serene landscape with mountains and a lake at sunset"
       );
       cy.get("button").contains("Generate Artwork").click();
       // Add more steps to test the NFT creation flow
     });
   });
   ```

4. Run the Cypress tests:
   ```bash
   npx cypress run
   ```

## Performance Testing

To test the performance of your frontend:

1. Use Lighthouse in Chrome DevTools:

   - Open Chrome DevTools (F12)
   - Go to the Lighthouse tab
   - Click "Generate report"
   - Check the performance, accessibility, best practices, and SEO scores

2. Use WebPageTest:
   - Go to https://www.webpagetest.org/
   - Enter your URL (http://localhost:3000)
   - Click "Start Test"
   - Analyze the results

## Browser Compatibility Testing

Test your application in different browsers:

- Chrome
- Firefox
- Safari
- Edge

## Mobile Responsiveness Testing

Test your application on different devices:

- Desktop
- Tablet
- Mobile

You can use Chrome DevTools' device emulation or real devices.

## Troubleshooting

If you encounter issues:

1. Check the browser console for errors
2. Verify that all services are running:
   ```bash
   docker-compose ps
   ```
3. Check the logs:
   ```bash
   docker-compose logs frontend
   ```
4. Restart the services:
   ```bash
   docker-compose down
   docker-compose up --build
   ```

## Reporting Issues

If you find a bug or issue:

1. Create a detailed description of the issue
2. Include steps to reproduce
3. Add screenshots or videos if possible
4. Submit the issue to the project repository
