import type { APIRequestContext, APIResponse } from '@playwright/test';
import { AuthenticatedApiClient } from './AuthenticatedApiClient';

export class UsersClient extends AuthenticatedApiClient {

    constructor(request: APIRequestContext) {
        super(request);
    }

    async getCurrentUser(): Promise<APIResponse> {

        return await this.authenticatedGet('/auth/me');

    }

}
