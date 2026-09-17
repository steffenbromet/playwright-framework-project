import type { APIRequestContext } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import type { ApiResult } from '../models/ApiResult';
import type { CreateProductRequest } from '../models/CreateProductRequest';
import type { Product } from '../models/Product';
import type { ProductsResponse } from '../models/ProductsResponse';
import type { UpdateProductRequest } from '../models/UpdateProductRequest';
import type { DeleteProductResponse } from '../models/DeleteProductResponse';

export class ProductsClient extends BaseApiClient {

    constructor(request: APIRequestContext) {
        super(request);
    }

    async getProducts(): Promise<ApiResult<ProductsResponse>> {
        return this.get<ProductsResponse>('/products');
    }

    async getProduct(id: number): Promise<ApiResult<Product>> {
        return this.get<Product>(`/products/${id}`);
    }

    async createProduct(product: CreateProductRequest): Promise<ApiResult<Product>> {
        return this.post<Product>('/products/add', product);
    }

    async updateProduct(id: number, product: UpdateProductRequest): Promise<ApiResult<Product>> {
        return this.put<Product>(`/products/${id}`, product);
    }

    async deleteProduct(id: number): Promise<ApiResult<DeleteProductResponse>> {
        return this.delete<DeleteProductResponse>(`/products/${id}`);
    }

    async searchProducts(query: string): Promise<ApiResult<ProductsResponse>> {
        return this.get<ProductsResponse>(`/products/search?q=${encodeURIComponent(query)}`);
    }

    async getProductsByCategory(category: string): Promise<ApiResult<ProductsResponse>> {
        return this.get<ProductsResponse>(`/products/category/${encodeURIComponent(category)}`);
    }

    async getProductCategories(): Promise<ApiResult<string[]>> {
        return this.get<string[]>('/products/category-list');
    }
}
