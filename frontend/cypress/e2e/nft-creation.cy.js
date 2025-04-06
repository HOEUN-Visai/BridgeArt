describe('NFT Creation Flow', () => {
  beforeEach(() => {
    // Visit the create NFT page before each test
    cy.visit('/create');
  });

  it('should display the create NFT form', () => {
    // Check for the title
    cy.contains('Create Your NFT').should('be.visible');
    
    // Check for the prompt input
    cy.get('textarea[placeholder*="Enter your prompt"]').should('be.visible');
    
    // Check for the generate button
    cy.contains('Generate Artwork').should('be.visible');
  });

  it('should handle prompt submission and artwork generation', () => {
    // Intercept the API call to the generate endpoint
    cy.intercept('POST', '/api/generate', {
      statusCode: 200,
      body: {
        success: true,
        imageUrl: 'https://example.com/generated-image.jpg'
      }
    }).as('generateArtwork');
    
    // Enter a prompt
    cy.get('textarea[placeholder*="Enter your prompt"]').type('A serene landscape with mountains and a lake at sunset');
    
    // Click the generate button
    cy.contains('Generate Artwork').click();
    
    // Check for loading state
    cy.contains('Generating artwork').should('be.visible');
    
    // Wait for the API call to complete
    cy.wait('@generateArtwork');
    
    // Check for the generated image
    cy.get('img[alt*="Generated artwork"]').should('be.visible');
    cy.get('img[alt*="Generated artwork"]').should('have.attr', 'src').and('include', 'https://example.com/generated-image.jpg');
    
    // Check for the mint button
    cy.contains('Mint NFT on Solana').should('be.visible');
  });

  it('should handle the minting process', () => {
    // Intercept the API calls
    cy.intercept('POST', '/api/generate', {
      statusCode: 200,
      body: {
        success: true,
        imageUrl: 'https://example.com/generated-image.jpg'
      }
    }).as('generateArtwork');
    
    cy.intercept('POST', '/api/mint', {
      statusCode: 200,
      body: {
        success: true,
        transactionHash: '0x1234567890abcdef'
      }
    }).as('mintNFT');
    
    // Mock the wallet connection
    cy.window().then((win) => {
      win.ethereum = {
        request: cy.stub().resolves(['0x1234567890abcdef'])
      };
    });
    
    // Enter a prompt and generate artwork
    cy.get('textarea[placeholder*="Enter your prompt"]').type('A serene landscape with mountains and a lake at sunset');
    cy.contains('Generate Artwork').click();
    
    // Wait for the artwork to be generated
    cy.wait('@generateArtwork');
    cy.get('img[alt*="Generated artwork"]').should('be.visible');
    
    // Click the mint button
    cy.contains('Mint NFT on Solana').click();
    
    // Check for minting state
    cy.contains('Minting NFT').should('be.visible');
    
    // Wait for the minting process to complete
    cy.wait('@mintNFT');
    
    // Check for success message
    cy.contains('NFT minted successfully').should('be.visible');
    
    // Check for the transaction hash
    cy.contains('Transaction Hash:').should('be.visible');
    cy.contains('0x1234567890abcdef').should('be.visible');
  });
}); 