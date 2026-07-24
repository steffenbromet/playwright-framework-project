import { test, expect } from '@playwright/test';
import { AuthClient } from '../../api/clients/AuthClient';

test.describe('Authentication API Tests', () => {

    test('should login successfully with valid credentials', async ({ request }) => {

        const authClient = new AuthClient(request);

        const response = await authClient.login(
            'emilys',
            'emilyspass'
        );

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.accessToken).toBeTruthy();
        expect(body.username).toBe('emilys');
    });

});
