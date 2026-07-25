import type { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import { TokenManager } from '../../utils/TokenManager';

export class AuthenticatedApiClient extends BaseApiClient {

    private tokenManager: TokenManager;

    constructor(request: APIRequestContext) {
        super(request);
        this.tokenManager = TokenManager.getInstance(request);
    }

    protected async authenticatedGet(
        endpoint: string
    ): Promise<APIResponse> {

        const token = await this.tokenManager.getAccessToken();

        return await this.request.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

    }

}
