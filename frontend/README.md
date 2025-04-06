# BridgeArt Frontend

This is the frontend for the BridgeArt platform, a multi-chain NFT platform that allows users to create, mint, and bridge NFTs across different blockchains.

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Docker and Docker Compose (for running the full stack)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/bridgeart.git
   cd bridgeart/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Edit the `.env.local` file and add your OpenAI API key:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Testing

### Unit and Component Testing

We use Jest and React Testing Library for unit and component testing.

1. Run all tests:

   ```bash
   npm test
   # or
   yarn test
   ```

2. Run tests in watch mode:

   ```bash
   npm run test:watch
   # or
   yarn test:watch
   ```

3. Generate test coverage report:
   ```bash
   npm run test:coverage
   # or
   yarn test:coverage
   ```

### End-to-End Testing

We use Cypress for end-to-end testing.

1. Open Cypress:

   ```bash
   npm run cypress:open
   # or
   yarn cypress:open
   ```

2. Run Cypress tests in headless mode:

   ```bash
   npm run cypress:run
   # or
   yarn cypress:run
   ```

3. Run end-to-end tests with the development server:
   ```bash
   npm run test:e2e
   # or
   yarn test:e2e
   ```

## Manual Testing

For a comprehensive guide on manual testing, please refer to the [TESTING.md](./TESTING.md) file.

## Project Structure

```
frontend/
├── components/         # React components
├── pages/              # Next.js pages
│   ├── api/            # API routes
│   └── ...             # Page components
├── public/             # Static assets
├── styles/             # CSS styles
├── __tests__/          # Jest tests
├── cypress/            # Cypress tests
│   ├── e2e/            # End-to-end tests
│   └── ...             # Cypress configuration
├── jest.config.js      # Jest configuration
├── jest.setup.js       # Jest setup
├── cypress.config.js   # Cypress configuration
├── next.config.js      # Next.js configuration
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
