import type { APIRequestContext } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import type { LoginResponse } from '../models/LoginResponse';
import type { ApiResult } from '../models/ApiResult';

export class AuthClient extends BaseApiClient {

    private readonly defaultUsername = 'emilys';
    private readonly defaultPassword = 'emilyspass';

    constructor(request: APIRequestContext) {
        super(request);
    }

    async login<T>(username: string, password: string): Promise<ApiResult<T>> {
        return this.post<T>('/auth/login',
            {
                username,
                password
            }
        );
    }

    async loginWithDefaultUser(): Promise<ApiResult<LoginResponse>> {
        return this.login<LoginResponse>(
            this.defaultUsername,
            this.defaultPassword
        );
    }
}
