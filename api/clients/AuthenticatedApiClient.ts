import type { APIRequestContext } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import { TokenManager } from '../../utils/TokenManager';
import type { ApiResult } from '../models/ApiResult';

export class AuthenticatedApiClient extends BaseApiClient {

    private tokenManager: TokenManager;

    constructor(request: APIRequestContext) {
        super(request);
        this.tokenManager = TokenManager.getInstance(request);
    }

    protected async authenticatedGet<T>(endpoint: string): Promise<ApiResult<T>> {

        const token = await this.tokenManager.getAccessToken();

        return this.executeRequest<T>(
            this.request.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        );
    }
}
