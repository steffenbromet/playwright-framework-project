import { test, expect } from '@playwright/test';
import { CartsClient } from '../../api/clients/CartsClient';
import type { CreateCartRequest } from '../../api/models/CreateCartRequest';
import type { UpdateCartRequest } from '../../api/models/UpdateCartRequest';


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

    test('should create a new cart', async ({ request }) => {
        const cartsClient = new CartsClient(request);

        const newCart: CreateCartRequest = {
            userId: 5,
            products: [
                {
                    id: 161,
                    quantity: 2
                },
                {
                    id: 39,
                    quantity: 3
                }
            ]
        };

        const result = await cartsClient.createCart(newCart);

        expect(result.status).toBe(201);
        expect(result.body.id).toBeGreaterThan(0);
        expect(result.body.userId).toBe(newCart.userId);
        expect(result.body.products.length).toBe(newCart.products.length);
        expect(result.body.totalProducts).toBe(newCart.products.length);

        const expectedTotalQuantity = newCart.products.reduce((sum, product) => sum + product.quantity, 0);
        expect(result.body.totalQuantity).toBe(expectedTotalQuantity);
    });

    test('should update a cart', async({ request }) => {
        const cartsClient = new CartsClient(request);

        const cartId = 1;

        const updatedCart: UpdateCartRequest = {
            merge: true,
            products: [
                {
                    id: 1,
                    quantity: 2
                }
            ]
        };

        const result = await cartsClient.updateCart(cartId, updatedCart);

        expect(result.status).toBe(200);
        expect(result.body.id).toBe(cartId);

        const productToUpdate = updatedCart.products[0];

        const updatedProduct = result.body.products.find(
            product => product.id === productToUpdate.id
        );

        expect(updatedProduct).toBeDefined();
        expect(updatedProduct?.quantity).toBe(productToUpdate.quantity);
    });

    test('should delete a cart', async ({ request }) => {
        const cartsClient = new CartsClient(request);

        const cartId = 1;

        const result = await cartsClient.deleteCart(cartId);

        expect(result.status).toBe(200);
        expect(result.body.id).toBe(cartId);
        expect(result.body.isDeleted).toBe(true);
        expect(result.body.deletedOn).toBeTruthy();
        expect(Date.parse(result.body.deletedOn)).not.toBeNaN();
    });
});
