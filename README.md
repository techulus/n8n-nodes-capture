# n8n Nodes - Capture

This is an n8n community node for [Capture](https://capture.page) - a powerful API for capturing website screenshots, generating PDFs, extracting content, and retrieving metadata.

![Capture](https://capture.page/logo.png)

[Capture](https://capture.page) provides a reliable and fast API for web page capture with features like:

- High-quality screenshots in multiple formats
- PDF generation with custom formatting
- Content extraction (HTML and text)
- Metadata extraction (titles, descriptions, etc.)
- Mobile and desktop viewport simulation
- Ad/tracker blocking capabilities

## Prerequisites

You need to have an account with Capture to use this node. You can sign up at [https://capture.page/console](https://capture.page/console).

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node supports all four Capture API endpoints:

### Screenshot

Capture website screenshots with customizable options:

- **Viewport dimensions** - Set custom width and height
- **Full page** - Capture entire scrollable content
- **Format** - PNG, JPEG, or WebP
- **Output** - Binary data or URL only

### PDF

Generate PDFs of web pages:

- **Format** - A4, A3, A5, Letter, Legal, Tabloid
- **Orientation** - Portrait or landscape
- **Full page** - Include entire scrollable content
- **Output** - Binary data or URL only

### Content

Extract HTML content and plain text from web pages:

- Returns structured JSON with HTML and text content
- Useful for content analysis and processing

### Metadata

Extract metadata from web pages:

- Page titles, descriptions, Open Graph data
- Social media metadata
- SEO-related information

## Configuration

### Credentials

You'll need to configure Capture API credentials:

1. Go to **Settings** → **Credentials** in your n8n instance
2. Create new credentials for **Capture API**
3. Enter your **API Key** and **API Secret** from [Capture Console](https://capture.page/console)

### Additional Options

All operations support additional options:

- **User Agent** - Custom user agent string
- **Wait For Selector/ID** - CSS selector or element ID to wait for
- **Block Ads/Trackers/Cookie Banners** - Block advertisements, tracking scripts, and cookie popups
- **Dark Mode** - Enable dark mode rendering
- **Mobile** - Emulate mobile device
- **Device Emulation** - Emulate specific devices (iPhone X, etc.)
- **HTTP Authentication** - Basic authentication support
- **Fresh** - Force new capture, ignore cache
- **Bot Detection Bypass** - Bypass anti-bot systems
- **Element Selection** - Screenshot specific elements
- **Transparent Background** - PNG transparency support
- **Best Format** - Auto-select optimal image format
- **Custom Filenames** - Set custom file names

## Example Workflows

### Basic Screenshot

```json
{
  "operation": "screenshot",
  "url": "https://example.com",
  "viewportWidth": 1200,
  "viewportHeight": 800,
  "format": "png",
  "output": "binaryData"
}
```

### Mobile Screenshot with Dark Mode

```json
{
  "operation": "screenshot",
  "url": "https://example.com",
  "viewportWidth": 375,
  "viewportHeight": 667,
  "additionalOptions": {
    "darkMode": true,
    "blockAds": true
  }
}
```

### PDF Generation

```json
{
  "operation": "pdf",
  "url": "https://example.com",
  "pdfFormat": "A4",
  "orientation": "portrait",
  "pdfOutput": "binaryData"
}
```

### Content Extraction

```json
{
  "operation": "content",
  "url": "https://example.com"
}
```

## Resources

- [Capture API Documentation](https://docs.capture.page)
- [Get API Credentials](https://capture.page/console)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)

## Version history

### 0.1.0

Initial release with support for:

- Screenshot capture with multiple formats
- PDF generation
- Content extraction
- Metadata extraction
- Comprehensive parameter support
- Binary data and URL output options

## Support

For issues related to this n8n node, please create an issue in this repository.

For Capture API related issues, please contact [Capture Support](https://techulus.atlassian.net/servicedesk/customer/portal/3).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
