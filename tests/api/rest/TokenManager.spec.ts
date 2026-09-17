import { test, expect } from '@playwright/test';
import { TokenManager } from '../../../utils/TokenManager';

test.describe('Token Manager Tests', () => {

    test('should retrieve an access token', async ({ request }) => {

        const tokenManager = new TokenManager(request);

        const token = await tokenManager.getAccessToken();

        expect(token).toBeTruthy();
        expect(typeof token).toBe('string');
        expect(token.length).toBeGreaterThan(0);
    });
});
