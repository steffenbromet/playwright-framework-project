import { test, expect } from '@playwright/test';
import { AuthClient } from '../../api/clients/AuthClient';

test.describe('Authentication API Tests', () => {

    test('should login successfully with valid credentials', async ({ request }) => {

        const authClient = new AuthClient(request);

        const response = await authClient.loginWithDefaultUser();

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.accessToken).toBeTruthy();
        expect(body.refreshToken).toBeTruthy();
        expect(body.username).toBe("emilys");
        expect(body.id).toBeGreaterThan(0);
    });

    test('Login with invalid credentials', async ({ request }) => {
        const authClient = new AuthClient(request);

        const response = await authClient.login(
            'wrong-user',
            'wrong-password'
        );

        expect(response.status()).toBe(400);

        const body = await response.json();

        expect(body.message).toContain('Invalid credentials');
    });

});
