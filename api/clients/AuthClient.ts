import type { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';

export class AuthClient extends BaseApiClient {

    constructor(request: APIRequestContext) {
        super(request);
    }

    async login(
        username: string,
        password: string
    ): Promise<APIResponse> {

        return await this.post('/auth/login', {
            username,
            password
        });
    }
}
