import type {
  ICredentialDataDecryptedObject,
  ICredentialTestRequest,
  ICredentialType,
  IHttpRequestOptions,
  INodeProperties,
} from "n8n-workflow";

export class CaptureApi implements ICredentialType {
  name = "captureApi";

  displayName = "Capture API";

  documentationUrl = "https://docs.capture.page/api/getting-started";

  properties: INodeProperties[] = [
    {
      displayName: "API Key",
      name: "apiKey",
      type: "string",
      typeOptions: { password: true },
      default: "",
      required: true,
      description: "Your Capture API key from https://capture.page/console",
    },
    {
      displayName: "API Secret",
      name: "apiSecret",
      type: "string",
      typeOptions: {
        password: true,
      },
      default: "",
      required: true,
      description: "Your Capture API secret from https://capture.page/console",
    },
  ];

  async authenticate(
    credentials: ICredentialDataDecryptedObject,
    requestOptions: IHttpRequestOptions
  ): Promise<IHttpRequestOptions> {
    const { createHash } = await import("node:crypto");
    const apiKey = credentials.apiKey as string;
    const apiSecret = credentials.apiSecret as string;

    // Build query string for test request (minimal params for testing)
    const queryString = "url=https://example.com";
    const token = createHash("md5")
      .update(apiSecret + queryString)
      .digest("hex");

    // Build the signed URL
    requestOptions.url = `/${apiKey}/${token}/image?${queryString}`;

    return requestOptions;
  }

  test: ICredentialTestRequest = {
    request: {
      baseURL: "https://cdn.capture.page",
      url: "",
      method: "HEAD",
    },
  };
}
