import { test, expect } from '@playwright/test';
import { UsersClient } from '../../api/clients/UsersClient';

test.describe('Users API Tests', () => {

    test('should retrieve current authenticated user', async ({ request }) => {

        const usersClient = new UsersClient(request);

        const response = await usersClient.getCurrentUser();

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.username).toBe('emilys');
        expect(body.id).toBeGreaterThan(0);

    });

});
