import { createHash } from 'crypto';
import type {
	IDataObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
	IExecuteFunctions,
	IBinaryData,
} from 'n8n-workflow';

export const CDN_URL = 'https://cdn.capture.page';

export interface CaptureRequestOptions {
	url: string;
	[key: string]: any;
}

export function generateToken(secret: string, queryString: string): string {
	return createHash('md5').update(secret + queryString).digest('hex');
}

export function buildQueryString(options: CaptureRequestOptions): string {
	const filteredOptions: IDataObject = {};

	for (const [key, value] of Object.entries(options)) {
		if (key === 'format') {
			continue;
		}
		if (value === null || value === undefined || value === '') {
			continue;
		}

		if (typeof value === 'boolean') {
			filteredOptions[key] = value ? 'true' : 'false';
		} else {
			filteredOptions[key] = value;
		}
	}

	return new URLSearchParams(filteredOptions as Record<string, string>).toString();
}

export function buildCaptureUrl(
	apiKey: string,
	apiSecret: string,
	type: 'image' | 'pdf' | 'content' | 'metadata',
	url: string,
	options: IDataObject = {},
): string {
	if (!apiKey || !apiSecret) {
		throw new Error('API key and secret are required');
	}

	if (!url) {
		throw new Error('URL is required');
	}

	const requestOptions: CaptureRequestOptions = {
		url,
		...options,
	};

	const queryString = buildQueryString(requestOptions);
	const token = generateToken(apiSecret, queryString);

	return `${CDN_URL}/${apiKey}/${token}/${type}?${queryString}`;
}

export async function captureApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any> {
	// Get credentials (not used for this API)
	await this.getCredentials('captureApi');

	const options: IHttpRequestOptions = {
		method,
		body,
		qs,
		url: endpoint,
		json: true,
		timeout: 60000,
	};

	try {
		return await this.helpers.httpRequest(options);
	} catch (error) {
		throw new Error(`Capture API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
}

export function validateUrl(url: string): boolean {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
}

export function createBinaryData(
	this: IExecuteFunctions,
	data: Buffer | Uint8Array,
	filename: string,
	mimeType: string,
): Promise<IBinaryData> {
	const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data);
	return this.helpers.prepareBinaryData(buffer, filename, mimeType);
}

export async function downloadBinaryContent(
	this: IExecuteFunctions,
	url: string,
): Promise<{ data: Buffer; contentType: string }> {
	const response = await this.helpers.httpRequest({
		method: 'GET',
		url,
		encoding: 'arraybuffer',
		timeout: 120000,
	});

	return {
		data: Buffer.isBuffer(response) ? response : Buffer.from(response),
		contentType: 'application/octet-stream',
	};
}