import { test, expect } from '@playwright/test';
import { TokenManager } from '../../utils/TokenManager';

test.describe('Token Manager Tests', () => {

    test('should retrieve an access token', async ({ request }) => {

        const tokenManager = TokenManager.getInstance(request);

        const token = await tokenManager.getAccessToken();

        expect(token).toBeTruthy();
        expect(typeof token).toBe('string');
        expect(token.length).toBeGreaterThan(0);
    });

    test('should return the same TokenManager instance', ({ request }) => {

        const firstInstance = TokenManager.getInstance(request);
        const secondInstance = TokenManager.getInstance(request);

        expect(firstInstance).toBe(secondInstance);
    });
});
