import { test, expect } from '@playwright/test';
import { AuthClient } from '../../api/clients/AuthClient';
import type { ErrorResponse } from '../../api/models/ErrorResponse';

test.describe('Authentication API Tests', () => {

    test('should login successfully with valid credentials', async ({ request }) => {
        const authClient = new AuthClient(request);

        const result = await authClient.loginWithDefaultUser();

        expect(result.status).toBe(200);

        expect(result.body.accessToken).toBeTruthy();
        expect(result.body.refreshToken).toBeTruthy();
        expect(result.body.username).toBe('emilys');
        expect(result.body.id).toBeGreaterThan(0);
        expect(result.body.email).toBeTruthy();
        expect(result.body.firstName).toBeTruthy();
        expect(result.body.lastName).toBeTruthy();
        expect(result.body.gender).toBeTruthy();
        expect(result.body.image).toBeTruthy();
    });

    test('should fail to login with invalid credentials', async ({ request }) => {
        const authClient = new AuthClient(request);

        const result = await authClient.login<ErrorResponse>(
            'wrong-user',
            'wrong-password'
        );

        expect(result.status).toBe(400);

        expect(result.body.message).toContain('Invalid credentials');
    });

});
