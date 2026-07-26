import type { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiResult } from '../models/ApiResult';

export class BaseApiClient {

    protected request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    protected async executeRequest<T>(requestPromise: Promise<APIResponse>): Promise<ApiResult<T>> {

        const response = await requestPromise;

        return {
            status: response.status(),
            body: await response.json() as T
        };
    }

    async get<T>(endpoint: string): Promise<ApiResult<T>> {

        return this.executeRequest<T>(
            this.request.get(endpoint)
        );
    }

    async post<T>(endpoint: string, data?: object): Promise<ApiResult<T>> {

        return this.executeRequest<T>(
            this.request.post(endpoint, { data })
        );
    }

    async put<T>(endpoint: string, data?: object): Promise<ApiResult<T>> {

        return this.executeRequest<T>(
            this.request.put(endpoint, { data })
        );
    }

    async delete<T>(endpoint: string): Promise<ApiResult<T>> {

        return this.executeRequest<T>(
            this.request.delete(endpoint)
        );
    }
}
