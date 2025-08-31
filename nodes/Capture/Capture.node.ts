import type {
  ICredentialDataDecryptedObject,
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import { NodeConnectionType, NodeOperationError } from "n8n-workflow";

import { captureOperations, captureFields } from "./CaptureDescription";

import {
  buildCaptureUrl,
  createBinaryData,
  downloadBinaryContent,
  validateUrl,
} from "./GenericFunctions";

export class Capture implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Capture",
    name: "capture",
    icon: "file:capture.svg",
    group: ["transform"],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description:
      "Capture website screenshots, generate PDFs, extract content and metadata",
    defaults: {
      name: "Capture",
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    credentials: [
      {
        name: "captureApi",
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: "https://cdn.capture.page",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
    properties: [...captureOperations, ...captureFields],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const credentials = (await this.getCredentials(
      "captureApi"
    )) as ICredentialDataDecryptedObject;

    const apiKey = credentials.apiKey as string;
    const apiSecret = credentials.apiSecret as string;

    let responseData: IDataObject;

    for (let i = 0; i < items.length; i++) {
      try {
        const operation = this.getNodeParameter("operation", i) as string;
        const url = this.getNodeParameter("url", i) as string;

        if (!validateUrl(url)) {
          throw new NodeOperationError(this.getNode(), `Invalid URL: ${url}`);
        }

        const additionalOptions = this.getNodeParameter(
          "additionalOptions",
          i,
          {}
        ) as IDataObject;

        // Build common options
        const options: IDataObject = {
          url,
          ...additionalOptions,
        };

        if (operation === "screenshot") {
          const viewportWidth = this.getNodeParameter(
            "viewportWidth",
            i
          ) as number;
          const viewportHeight = this.getNodeParameter(
            "viewportHeight",
            i
          ) as number;
          const fullPage = this.getNodeParameter("fullPage", i) as boolean;
          const format = this.getNodeParameter("format", i) as string;
          const delay = this.getNodeParameter("delay", i) as number;
          const output = this.getNodeParameter("output", i) as string;

          options.vw = viewportWidth;
          options.vh = viewportHeight;
          options.full = fullPage;
          options.format = format;

          if (delay > 0) {
            options.delay = delay;
          }

          const screenshotUrl = buildCaptureUrl(
            apiKey,
            apiSecret,
            "image",
            url,
            options
          );

          if (output === "url") {
            responseData = {
              url: screenshotUrl,
              operation: "screenshot",
              format,
              viewportWidth,
              viewportHeight,
              fullPage,
            };
          } else {
            // Download binary data
            const { data } = await downloadBinaryContent.call(
              this,
              screenshotUrl
            );
            const filename = `screenshot-${Date.now()}.${format}`;
            const mimeType =
              format === "png"
                ? "image/png"
                : format === "jpg"
                ? "image/jpeg"
                : "image/webp";

            const binaryData = await createBinaryData.call(
              this,
              data,
              filename,
              mimeType
            );

            responseData = {
              url: screenshotUrl,
              operation: "screenshot",
              format,
              viewportWidth,
              viewportHeight,
              fullPage,
            };

            returnData.push({
              json: responseData,
              binary: {
                data: binaryData,
              },
              pairedItem: {
                item: i,
              },
            });
            continue;
          }
        } else if (operation === "pdf") {
          const pdfFormat = this.getNodeParameter("pdfFormat", i) as string;
          const orientation = this.getNodeParameter("orientation", i) as string;
          const pdfFullPage = this.getNodeParameter(
            "pdfFullPage",
            i
          ) as boolean;
          const pdfDelay = this.getNodeParameter("pdfDelay", i) as number;
          const pdfOutput = this.getNodeParameter("pdfOutput", i) as string;

          options.format = pdfFormat;
          options.orientation = orientation;
          options.full = pdfFullPage;

          if (pdfDelay > 0) {
            options.delay = pdfDelay;
          }

          const pdfUrl = buildCaptureUrl(
            apiKey,
            apiSecret,
            "pdf",
            url,
            options
          );

          if (pdfOutput === "url") {
            responseData = {
              url: pdfUrl,
              operation: "pdf",
              format: pdfFormat,
              orientation,
              fullPage: pdfFullPage,
            };
          } else {
            // Download binary data
            const { data } = await downloadBinaryContent.call(this, pdfUrl);
            const filename = `document-${Date.now()}.pdf`;
            const mimeType = "application/pdf";

            const binaryData = await createBinaryData.call(
              this,
              data,
              filename,
              mimeType
            );

            responseData = {
              url: pdfUrl,
              operation: "pdf",
              format: pdfFormat,
              orientation,
              fullPage: pdfFullPage,
            };

            returnData.push({
              json: responseData,
              binary: {
                data: binaryData,
              },
              pairedItem: {
                item: i,
              },
            });
            continue;
          }
        } else if (operation === "content") {
          const contentUrl = buildCaptureUrl(
            apiKey,
            apiSecret,
            "content",
            url,
            options
          );

          // Fetch content data
          const response = await this.helpers.httpRequest({
            method: "GET",
            url: contentUrl,
            json: true,
          });

          responseData = {
            url: contentUrl,
            operation: "content",
            ...response,
          };
        } else if (operation === "metadata") {
          const metadataUrl = buildCaptureUrl(
            apiKey,
            apiSecret,
            "metadata",
            url,
            options
          );

          // Fetch metadata
          const response = await this.helpers.httpRequest({
            method: "GET",
            url: metadataUrl,
            json: true,
          });

          responseData = {
            url: metadataUrl,
            operation: "metadata",
            ...response,
          };
        } else {
          throw new NodeOperationError(
            this.getNode(),
            `Unsupported operation: ${operation}`
          );
        }

        returnData.push({
          json: responseData,
          pairedItem: {
            item: i,
          },
        });
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: {
              error: error instanceof Error ? error.message : "Unknown error",
              operation: this.getNodeParameter("operation", i),
              url: this.getNodeParameter("url", i),
            },
            pairedItem: {
              item: i,
            },
          });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}
