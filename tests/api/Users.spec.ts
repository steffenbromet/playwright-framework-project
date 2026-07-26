import { test, expect } from '@playwright/test';
import { UsersClient } from '../../api/clients/UsersClient';

test.describe('Users API Tests', () => {

    test('should retrieve current authenticated user', async ({ request }) => {

        const usersClient = new UsersClient(request);

        const result = await usersClient.getCurrentUser();

        expect(result.status).toBe(200);

        expect(result.body.username).toBe('emilys');
        expect(result.body.id).toBeGreaterThan(0);

    });

});
