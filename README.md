# 🔍 Broken Links Detector

## 🎯 Overview
This Cypress project automatically detects broken links on web pages by checking HTTP status codes for all links. It's particularly useful for quality assurance and website maintenance, helping identify dead links, missing resources, and server errors.

## ✨ Features
- 🌐 Tests any web page for broken links
- 📊 Provides detailed reporting of link status
- ⚡ Fast parallel link checking
- 🎨 Beautiful console output with status indicators
- 🔄 Automatic retry on network failures
- 📝 Comprehensive error logging

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/BrokenLinks.git

# Navigate to project directory
cd BrokenLinks

# Install dependencies
npm install
```

## 📋 Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Cypress (v15 or higher)

## 🚀 Usage

### Running the Tests
```bash
# Run in headless mode
npx cypress run --spec "cypress/e2e/brokenLinksWikipedia.cy.js"

# Run in interactive mode
npx cypress open
```

## 💻 Code Example

Here's how the broken links detector works:

```javascript
describe('Check for Broken Links', () => {
  // Array to store broken links for reporting
  let brokenLinksArray = []

  it('Should detect broken links', () => {
    let totalLinks = 0
    let activeLinks = 0
    let brokenLinks = 0

    // Visit the test page
    cy.visit('http://the-internet.herokuapp.com/status_codes')

    // Get all links and check each one
    cy.get('a[href]').each(($link) => {
      const href = $link.attr('href')
      const linkText = $link.text()

      if (href) {
        totalLinks++
        
        // Check link status
        cy.request({
          url: href,
          failOnStatusCode: false,
          timeout: 10000
        }).then((response) => {
          if (response.status >= 400) {
            // Log broken link
            cy.log(`❌ Broken Link: ${href} (${response.status})`)
            brokenLinks++
          } else {
            // Log working link
            cy.log(`✅ Active Link: ${href}`)
            activeLinks++
          }
        })
      }
    })
  })
})
```

## 📊 Output Example

The test provides detailed output for each link:

```
=== Link Check Summary ===
✅ Total Links Checked: 42
✅ Active Links: 38
❌ Broken Links: 4

=== Broken Links Details ===
❌ Broken Link:
   URL: http://example.com/broken-link
   Status: 404
   Link Text: Broken Link Example
---
```

## 🔍 What It Checks

1. 🌐 **HTTP Status Codes**
   - 2XX: Success (Working Links)
   - 3XX: Redirects (Working Links)
   - 4XX: Client Errors (Broken Links)
   - 5XX: Server Errors (Broken Links)

2. 📝 **Link Types**
   - Absolute URLs
   - Relative URLs
   - Internal Links
   - External Links

## ⚙️ Configuration

The test timeout and other settings can be configured in `cypress.config.js`:

```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    pageLoadTimeout: 120000,
    screenshotOnRunFailure: false,
    screenshotTimeout: 60000,
  },
});
```

## 🤝 Contributing
Feel free to:
- 🐛 Report bugs
- 💡 Suggest new features
- 🔧 Submit PRs

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

##  Author
- **Saran Kumar**
  - Test Automation Engineer
  - GitHub: [@mvsaran](https://github.com/mvsaran)

## 🙏 Acknowledgments
- Cypress.io for the amazing testing framework
- The Internet Herokuapp for providing test endpoints
