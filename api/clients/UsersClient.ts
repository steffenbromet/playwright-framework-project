import type { APIRequestContext } from '@playwright/test';
import { AuthenticatedApiClient } from './AuthenticatedApiClient';
import { User } from '../models/User';

export class UsersClient extends AuthenticatedApiClient {

    constructor(request: APIRequestContext) {
        super(request);
    }

    async getCurrentUser() {
        return this.authenticatedGet<User>('/auth/me');
    }
}
