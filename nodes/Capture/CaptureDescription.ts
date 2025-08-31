import type { INodeProperties } from "n8n-workflow";

export const captureOperations: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    options: [
      {
        name: "Screenshot",
        value: "screenshot",
        description: "Take a screenshot of a webpage",
        action: "Take a screenshot of a webpage",
      },
      {
        name: "PDF",
        value: "pdf",
        description: "Generate a PDF of a webpage",
        action: "Generate a PDF of a webpage",
      },
      {
        name: "Content",
        value: "content",
        description: "Extract HTML content and text from a webpage",
        action: "Extract content from a webpage",
      },
      {
        name: "Metadata",
        value: "metadata",
        description: "Extract metadata from a webpage",
        action: "Extract metadata from a webpage",
      },
    ],
    default: "screenshot",
  },
];

export const captureFields: INodeProperties[] = [
  // Common fields for all operations
  {
    displayName: "URL",
    name: "url",
    type: "string",
    default: "",
    placeholder: "https://example.com",
    description: "The URL of the webpage to capture",
    required: true,
  },

  // Screenshot specific fields
  {
    displayName: "Viewport Width",
    name: "viewportWidth",
    type: "number",
    typeOptions: {
      minValue: 100,
      maxValue: 3000,
    },
    default: 1200,
    description: "Width of the browser viewport in pixels",
    displayOptions: {
      show: {
        operation: ["screenshot"],
      },
    },
  },
  {
    displayName: "Viewport Height",
    name: "viewportHeight",
    type: "number",
    typeOptions: {
      minValue: 100,
      maxValue: 3000,
    },
    default: 800,
    description: "Height of the browser viewport in pixels",
    displayOptions: {
      show: {
        operation: ["screenshot"],
      },
    },
  },
  {
    displayName: "Full Page",
    name: "fullPage",
    type: "boolean",
    default: false,
    description: "Whether to capture the full scrollable page",
    displayOptions: {
      show: {
        operation: ["screenshot"],
      },
    },
  },
  {
    displayName: "Format",
    name: "format",
    type: "options",
    options: [
      {
        name: "PNG",
        value: "png",
      },
      {
        name: "JPEG",
        value: "jpg",
      },
      {
        name: "WebP",
        value: "webp",
      },
    ],
    default: "png",
    description: "Image format for the screenshot",
    displayOptions: {
      show: {
        operation: ["screenshot"],
      },
    },
  },
  {
    displayName: "Delay",
    name: "delay",
    type: "number",
    typeOptions: {
      minValue: 0,
      maxValue: 30,
    },
    default: 0,
    description: "Delay in seconds before taking the screenshot",
    displayOptions: {
      show: {
        operation: ["screenshot"],
      },
    },
  },
  {
    displayName: "Output",
    name: "output",
    type: "options",
    options: [
      {
        name: "Binary Data",
        value: "binaryData",
        description: "Download the image as binary data",
      },
      {
        name: "URL Only",
        value: "url",
        description: "Return only the URL to the image",
      },
    ],
    default: "binaryData",
    description: "Choose how to return the screenshot data",
    displayOptions: {
      show: {
        operation: ["screenshot"],
      },
    },
  },
  {
    displayName: "Scale Factor",
    name: "scaleFactor",
    type: "number",
    typeOptions: {
      minValue: 1,
      maxValue: 3,
      numberStepSize: 0.1,
    },
    default: 1,
    description: "Screen scale factor for high-DPI screenshots",
    displayOptions: {
      show: {
        operation: ["screenshot"],
      },
    },
  },
  {
    displayName: "Element Selector",
    name: "selector",
    type: "string",
    default: "",
    placeholder: "#main-content",
    description: "CSS selector to screenshot a specific element",
    displayOptions: {
      show: {
        operation: ["screenshot"],
      },
    },
  },
  {
    displayName: "Transparent Background",
    name: "transparent",
    type: "boolean",
    default: false,
    description: "Whether to use transparent background (PNG only)",
    displayOptions: {
      show: {
        operation: ["screenshot"],
        format: ["png"],
      },
    },
  },

  // PDF specific fields
  {
    displayName: "Format",
    name: "pdfFormat",
    type: "options",
    options: [
      {
        name: "A3",
        value: "A3",
      },
      {
        name: "A4",
        value: "A4",
      },
      {
        name: "A5",
        value: "A5",
      },
      {
        name: "Legal",
        value: "Legal",
      },
      {
        name: "Letter",
        value: "Letter",
      },
      {
        name: "Tabloid",
        value: "Tabloid",
      },
    ],
    default: "A4",
    description: "PDF page format",
    displayOptions: {
      show: {
        operation: ["pdf"],
      },
    },
  },
  {
    displayName: "Orientation",
    name: "orientation",
    type: "options",
    options: [
      {
        name: "Portrait",
        value: "portrait",
      },
      {
        name: "Landscape",
        value: "landscape",
      },
    ],
    default: "portrait",
    description: "PDF page orientation",
    displayOptions: {
      show: {
        operation: ["pdf"],
      },
    },
  },
  {
    displayName: "Full Page",
    name: "pdfFullPage",
    type: "boolean",
    default: false,
    description: "Whether to generate PDF of the full scrollable page",
    displayOptions: {
      show: {
        operation: ["pdf"],
      },
    },
  },
  {
    displayName: "Delay",
    name: "pdfDelay",
    type: "number",
    typeOptions: {
      minValue: 0,
      maxValue: 30,
    },
    default: 0,
    description: "Delay in seconds before generating the PDF",
    displayOptions: {
      show: {
        operation: ["pdf"],
      },
    },
  },
  {
    displayName: "Output",
    name: "pdfOutput",
    type: "options",
    options: [
      {
        name: "Binary Data",
        value: "binaryData",
        description: "Download the PDF as binary data",
      },
      {
        name: "URL Only",
        value: "url",
        description: "Return only the URL to the PDF",
      },
    ],
    default: "binaryData",
    description: "Choose how to return the PDF data",
    displayOptions: {
      show: {
        operation: ["pdf"],
      },
    },
  },
  {
    displayName: "Scale",
    name: "scale",
    type: "number",
    typeOptions: {
      minValue: 0.1,
      maxValue: 2,
      numberStepSize: 0.1,
    },
    default: 1,
    description: "Scale factor for PDF rendering",
    displayOptions: {
      show: {
        operation: ["pdf"],
      },
    },
  },
  {
    displayName: "Print Background",
    name: "printBackground",
    type: "boolean",
    default: false,
    description: "Whether to print background graphics",
    displayOptions: {
      show: {
        operation: ["pdf"],
      },
    },
  },
  {
    displayName: "Margins",
    name: "margins",
    type: "collection",
    placeholder: "Add Margin",
    default: {},
    description: "PDF page margins",
    displayOptions: {
      show: {
        operation: ["pdf"],
      },
    },
    options: [
      {
        displayName: "Top",
        name: "marginTop",
        type: "string",
        default: "",
        placeholder: "1cm",
        description: "Top margin",
      },
      {
        displayName: "Right",
        name: "marginRight", 
        type: "string",
        default: "",
        placeholder: "1cm",
        description: "Right margin",
      },
      {
        displayName: "Bottom",
        name: "marginBottom",
        type: "string",
        default: "",
        placeholder: "1cm", 
        description: "Bottom margin",
      },
      {
        displayName: "Left",
        name: "marginLeft",
        type: "string",
        default: "",
        placeholder: "1cm",
        description: "Left margin",
      },
    ],
  },

  // Common additional options
  {
    displayName: "Additional Options",
    name: "additionalOptions",
    type: "collection",
    placeholder: "Add Option",
    default: {},
    options: [
      {
        displayName: "Best Format",
        name: "bestFormat",
        type: "boolean", 
        default: false,
        description: "Whether to automatically select optimal image format",
      },
      {
        displayName: "Block Ads",
        name: "blockAds",
        type: "boolean",
        default: false,
        description: "Whether to block advertisements",
      },
      {
        displayName: "Block Cookie Banners",
        name: "blockCookieBanners",
        type: "boolean",
        default: false,
        description: "Whether to automatically dismiss cookie banners",
      },
      {
        displayName: "Block Trackers",
        name: "blockTrackers",
        type: "boolean",
        default: false,
        description: "Whether to block tracking scripts",
      },
      {
        displayName: "Bypass Bot Detection",
        name: "bypassBotDetection",
        type: "boolean",
        default: false,
        description: "Whether to bypass bot detection systems",
      },
      {
        displayName: "Dark Mode",
        name: "darkMode",
        type: "boolean",
        default: false,
        description: "Whether to enable dark mode",
      },
      {
        displayName: "Emulate Device",
        name: "emulateDevice",
        type: "string",
        default: "",
        placeholder: "iPhone X",
        description: "Device to emulate for screenshots",
      },
      {
        displayName: "File Name",
        name: "fileName",
        type: "string",
        default: "",
        placeholder: "my-screenshot",
        description: "Custom filename for saved file",
      },
      {
        displayName: "Fresh",
        name: "fresh",
        type: "boolean",
        default: false,
        description: "Whether to force new capture, ignore existing cache",
      },
      {
        displayName: "HTTP Authentication",
        name: "httpAuth",
        type: "string",
        default: "",
        description: "HTTP Basic Authentication (base64url encoded username:password)",
      },
      {
        displayName: "Mobile",
        name: "mobile",
        type: "boolean",
        default: false,
        description: "Whether to emulate mobile device",
      },
      {
        displayName: "User Agent",
        name: "userAgent",
        type: "string",
        default: "",
        description: "Custom user agent string to use",
      },
      {
        displayName: "Wait For ID",
        name: "waitForId",
        type: "string",
        default: "",
        description: "Element ID to wait for before capturing",
      },
      {
        displayName: "Wait For Selector",
        name: "waitForSelector", 
        type: "string",
        default: "",
        description: "CSS selector to wait for before capturing",
      },
    ],
  },
];
