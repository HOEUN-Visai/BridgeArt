describe('Wallet Connection Flow', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/');
  });

  it('should display the connect wallet button', () => {
    // Check for the connect wallet button
    cy.contains('Connect Wallet').should('be.visible');
  });

  it('should open the wallet connection modal when clicking the connect button', () => {
    // Click the connect wallet button
    cy.contains('Connect Wallet').click();
    
    // Check for the wallet connection modal
    cy.contains('Connect your wallet').should('be.visible');
    
    // Check for wallet options
    cy.contains('Phantom').should('be.visible');
    cy.contains('Solflare').should('be.visible');
    cy.contains('MetaMask').should('be.visible');
  });

  it('should connect to a Solana wallet', () => {
    // Mock the Phantom wallet
    cy.window().then((win) => {
      win.solana = {
        isPhantom: true,
        connect: cy.stub().resolves({ publicKey: { toString: () => 'ABC123' } }),
        disconnect: cy.stub().resolves(),
        on: cy.stub(),
        request: cy.stub()
      };
    });
    
    // Click the connect wallet button
    cy.contains('Connect Wallet').click();
    
    // Click the Phantom wallet option
    cy.contains('Phantom').click();
    
    // Check for the connected state
    cy.contains('ABC123').should('be.visible');
  });

  it('should connect to an Ethereum wallet', () => {
    // Mock the MetaMask wallet
    cy.window().then((win) => {
      win.ethereum = {
        isMetaMask: true,
        request: cy.stub().resolves(['0x1234567890abcdef']),
        on: cy.stub(),
        removeListener: cy.stub()
      };
    });
    
    // Click the connect wallet button
    cy.contains('Connect Wallet').click();
    
    // Click the MetaMask wallet option
    cy.contains('MetaMask').click();
    
    // Check for the connected state
    cy.contains('0x1234...90abcdef').should('be.visible');
  });

  it('should disconnect the wallet', () => {
    // Mock the Phantom wallet
    cy.window().then((win) => {
      win.solana = {
        isPhantom: true,
        connect: cy.stub().resolves({ publicKey: { toString: () => 'ABC123' } }),
        disconnect: cy.stub().resolves(),
        on: cy.stub(),
        request: cy.stub()
      };
    });
    
    // Connect to the wallet
    cy.contains('Connect Wallet').click();
    cy.contains('Phantom').click();
    cy.contains('ABC123').should('be.visible');
    
    // Click the disconnect button
    cy.get('button').contains('ABC123').click();
    cy.contains('Disconnect').click();
    
    // Check for the disconnected state
    cy.contains('Connect Wallet').should('be.visible');
  });
}); 