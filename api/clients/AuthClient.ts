import type { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';

export class AuthClient extends BaseApiClient {

    private readonly defaultUsername = 'emilys';
    private readonly defaultPassword = 'emilyspass';

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

    async loginWithDefaultUser(): Promise<APIResponse> {
        return await this.login(
            this.defaultUsername,
            this.defaultPassword
        );
    }
}
