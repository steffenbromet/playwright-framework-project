import type { APIRequestContext } from '@playwright/test';
import { AuthClient } from '../api/rest/clients/AuthClient';
 
export class TokenManager {

    private authClient: AuthClient;
    private accessToken?: string;

    constructor(request: APIRequestContext) {
        //console.log(`Creating TokenManager PID: ${process.pid}`);
        this.authClient = new AuthClient(request);
    }

    async getAccessToken(): Promise<string> {

        if (this.accessToken) {
            return this.accessToken;
        }

        // console.log(`Performing login PID: ${process.pid}`);

        const result = await this.authClient.loginWithDefaultUser();

        const token = result.body.accessToken;

        if (!token) {
            throw new Error('Access token was not returned by the API.');
        }

        this.accessToken = token;

        return token;
    }
}
