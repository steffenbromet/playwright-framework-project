import type { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseApiClient {
    protected request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async get(
        endpoint: string
    ): Promise<APIResponse> {
        return await this.request.get(endpoint);
    }

    async post(
        endpoint: string,
        data?: object
    ): Promise<APIResponse> {
        return await this.request.post(endpoint, {
            data,
        });
    }

    async put(
        endpoint: string,
        data?: object
    ): Promise<APIResponse> {
        return await this.request.put(endpoint, {
            data,
        });
    }

    async delete(
        endpoint: string
    ): Promise<APIResponse> {
        return await this.request.delete(endpoint);
    }
}
