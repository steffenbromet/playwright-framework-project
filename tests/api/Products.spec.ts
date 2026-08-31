import { test, expect } from '@playwright/test';
import { ProductsClient } from '../../api/clients/ProductsClient';
import { CreateProductRequest } from '../../api/models/CreateProductRequest';
import { UpdateProductRequest } from '../../api/models/UpdateProductRequest';

test.describe('Products API Tests', () => {

    test('should retrieve product collection', async ({ request }) => {

        const productsClient = new ProductsClient(request);

        const result = await productsClient.getProducts();

        expect(result.status).toBe(200);

        expect(result.body.products.length).toBeGreaterThan(0);
        expect(result.body.total).toBeGreaterThan(0);
        expect(result.body.skip).toBe(0);
        expect(result.body.limit).toBeGreaterThan(0);

        const firstProduct = result.body.products[0];

        expect(firstProduct.id).toBeGreaterThan(0);
        expect(firstProduct.title).toBeTruthy();
        expect(firstProduct.price).toBeGreaterThan(0);
        expect(firstProduct.category).toBeTruthy();
    });

    test('should retrieve a product by id', async ({ request }) => {

        const productsClient = new ProductsClient(request);

        const productId = 1;

        const result = await productsClient.getProduct(productId);

        expect(result.status).toBe(200);

        expect(result.body.id).toBe(productId);
        expect(result.body.title).toBeTruthy();
        expect(result.body.description).toBeTruthy();
        expect(result.body.price).toBeGreaterThan(0);
        expect(result.body.category).toBeTruthy();
    });

    test('should create product', async ({ request }) => {

        const productsClient = new ProductsClient(request);

        const newProduct: CreateProductRequest = {
            title: 'Gaming Keyboard',
            description: 'Mechanical gaming keyboard',
            category: 'electronics',
            price: 89.99,
            brand: 'Test Brand'
        };

        const result = await productsClient.createProduct(newProduct);

        expect(result.status).toBe(201);

        expect(result.body.id).toBeGreaterThan(0);
        expect(result.body.title).toBe(newProduct.title);
        expect(result.body.description).toBe(newProduct.description);
        expect(result.body.category).toBe(newProduct.category);
        expect(result.body.price).toBe(newProduct.price);
        expect(result.body.brand).toBe(newProduct.brand);
    });

    test('should update product', async ({ request }) => {

        const productsClient = new ProductsClient(request);

        const productId = 1;

        const updateData: UpdateProductRequest = {
            title: 'Updated Gaming Keyboard',
            price: 99.99
        };

        const result = await productsClient.updateProduct(
            productId,
            updateData
        );

        expect(result.status).toBe(200);

        expect(result.body.id).toBe(productId);
        expect(result.body.title).toBe(updateData.title);
        expect(result.body.price).toBe(updateData.price);
    });

    test('should delete product', async ({ request }) => {

        const productsClient = new ProductsClient(request);

        const productId = 1;

        const result = await productsClient.deleteProduct(productId);

        expect(result.status).toBe(200);

        expect(result.body.id).toBe(productId);
        expect(result.body.isDeleted).toBe(true);
        expect(result.body.deletedOn).toBeTruthy();
        expect(Date.parse(result.body.deletedOn)).not.toBeNaN();
    });

    test('should retrieve products using a search query', async ({ request }) => {

        const productsClient = new ProductsClient(request);

        const searchQuery = 'phone';

        const result = await productsClient.searchProducts(searchQuery);

        expect(result.status).toBe(200);
        expect(result.body.products.length).toBeGreaterThan(0);
    });

    test('should retrieve products by category', async ({ request }) => {

        const productsClient = new ProductsClient(request);

        const searchCategory = 'beauty';

        const result = await productsClient.getProductsByCategory(searchCategory);

        expect(result.status).toBe(200);
        expect(result.body.products.length).toBeGreaterThan(0);

        const productsList = result.body.products;

        for (const product of productsList) {
            expect(product.category).toBe(searchCategory);
        }
    });

    test('should retrieve product categories', async ({ request }) => {

        const productsClient = new ProductsClient(request);

        const result = await productsClient.getProductCategories();

        expect(result.status).toBe(200);
        expect(result.body.length).toBeGreaterThan(0);

        for (const category of result.body) {
            expect(category).toBeTruthy();
        }
    });

});
