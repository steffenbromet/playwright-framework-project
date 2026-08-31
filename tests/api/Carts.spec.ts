import { test, expect } from '@playwright/test';
import { CartsClient } from '../../api/clients/CartsClient';

test.describe('Carts API Tests', () => {

    test('should retrieve all carts', async ({ request }) => {
        const cartsClient = new CartsClient(request);

        const result = await cartsClient.getCarts();

        expect(result.status).toBe(200);

        expect(result.body.carts.length).toBeGreaterThan(0);
        expect(result.body.total).toBeGreaterThan(0);
        expect(result.body.skip).toBe(0);
        expect(result.body.limit).toBeGreaterThan(0);

        const firstCart = result.body.carts[0];

        expect(firstCart.id).toBeGreaterThan(0);
        expect(firstCart.total).toBeGreaterThan(0);
        expect(firstCart.products.length).toBeGreaterThan(0);
        expect(firstCart.totalProducts).toBeGreaterThan(0);
        expect(firstCart.totalQuantity).toBeGreaterThan(0);
    
    });

    test('should retrieve cart by id', async ({ request }) => {

        const cartsClient = new CartsClient(request);

        const cartId = 1;

        const result = await cartsClient.getCart(cartId);

        expect(result.status).toBe(200);

        expect(result.body.id).toBe(cartId);
        expect(result.body.total).toBeGreaterThan(0);
        expect(result.body.products.length).toBeGreaterThan(0);
        expect(result.body.totalProducts).toBeGreaterThan(0);
        expect(result.body.totalQuantity).toBeGreaterThan(0);
    });

    test('should retrieve carts by user id', async ({ request }) => {
        const cartsClient = new CartsClient(request);

        const userId = 5;

        const result = await cartsClient.getCartsByUser(userId);

        expect(result.status).toBe(200);
        expect(result.body.carts.length).toBeGreaterThan(0);

        for (const cart of result.body.carts) {
            expect(cart.userId).toBe(userId);
        }
    });
});
