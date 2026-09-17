import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { ApiResult } from '../models/ApiResult';

export class BaseApiClient {

    protected request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    protected async executeRequest<T>(responsePromise: Promise<APIResponse>): Promise<ApiResult<T>> {

        const response = await responsePromise;

        return {
            status: response.status(),
            body: await response.json() as T
        };
    }

    protected async get<T>(endpoint: string): Promise<ApiResult<T>> {
        return this.executeRequest<T>(
            this.request.get(endpoint)
        );
    }

    protected async post<T>(endpoint: string, data?: object): Promise<ApiResult<T>> {
        return this.executeRequest<T>(
            this.request.post(endpoint, { data })
        );
    }

    protected async put<T>(endpoint: string, data?: object): Promise<ApiResult<T>> {
        return this.executeRequest<T>(
            this.request.put(endpoint, { data })
        );
    }

    protected async delete<T>(endpoint: string): Promise<ApiResult<T>> {
        return this.executeRequest<T>(
            this.request.delete(endpoint)
        );
    }
}
