import type { APIRequestContext } from '@playwright/test';
import { AuthenticatedApiClient } from './AuthenticatedApiClient';
import type { ApiResult } from '../models/ApiResult';
import type { User } from '../models/User';

export class UsersClient extends AuthenticatedApiClient {

    constructor(request: APIRequestContext) {
        super(request);
    }

    async getCurrentUser(): Promise<ApiResult<User>> {
        return this.authenticatedGet<User>('/auth/me');
    }
}
