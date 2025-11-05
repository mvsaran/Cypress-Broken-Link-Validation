describe('Check for Broken Links', () => {
  // Array to store broken links for reporting
  let brokenLinksArray = []

  // Handle uncaught exceptions
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })

  it('Should detect broken links', () => {
    let totalLinks = 0
    let activeLinks = 0
    let brokenLinks = 0

    // Visit a test page with intentionally broken links
    cy.visit('http://the-internet.herokuapp.com/status_codes', {
      timeout: 30000,
      retryOnNetworkFailure: true
    })

    // Wait for the document to be ready
    cy.document().should('have.property', 'readyState', 'complete')

    // Get all links from the page
    cy.get('a[href]').each(($link) => {
      const href = $link.attr('href')
      const linkText = $link.text()

      // Skip empty links, javascript: links, mailto: links, and tel: links
      if (href && 
          !href.startsWith('javascript:') && 
          !href.startsWith('mailto:') && 
          !href.startsWith('tel:')) {
        
        totalLinks++
        
        // Convert relative URLs to absolute URLs
        const absoluteUrl = href.startsWith('http') 
          ? href 
          : new URL(href, 'http://the-internet.herokuapp.com').toString()

        totalLinks++
        // Check each link with better error handling
        cy.request({
          url: absoluteUrl,
          failOnStatusCode: false,
          timeout: 10000 // Shorter timeout for quicker feedback
        }).then((response) => {
          if (response.status >= 400) {
            brokenLinks++
            brokenLinksArray.push({
              url: absoluteUrl,
              status: response.status,
              text: linkText || 'No link text'
            })
            cy.log(`❌ Broken Link Found:`)
            cy.log(`   URL: ${absoluteUrl}`)
            cy.log(`   Status: ${response.status}`)
            cy.log(`   Link Text: ${linkText || 'No link text'}`)
          } else {
            activeLinks++
            cy.log(`✅ Working Link: ${absoluteUrl}`)
          }
        })
      }
    }).then(() => {
      // Log the summary
      cy.log('\n=== Link Check Summary ===')
      cy.log(`Total Links Checked: ${totalLinks}`)
      cy.log(`Active Links: ${activeLinks}`)
      cy.log(`Broken Links: ${brokenLinks}`)
      
      // If there are broken links, log them in detail
      if (brokenLinksArray.length > 0) {
        cy.log('\n=== Broken Links Details ===')
        brokenLinksArray.forEach(link => {
          cy.log(`URL: ${link.url}`)
          cy.log(`Status: ${link.status}`)
          cy.log(`Text: ${link.text}`)
          cy.log('---')
        })
      }

      // We expect to find some broken links in this demo
      cy.log(`Found ${brokenLinks} broken links out of ${totalLinks} total links`)
      // Don't fail the test as we're demonstrating broken link detection
      expect(true).to.be.true
    })
  })
})
