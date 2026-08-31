import { BaseApiClient } from './BaseApiClient';
import type { APIRequestContext } from '@playwright/test';
import type { ApiResult } from '../models/ApiResult';
import type { Cart, CartsResponse } from '../models/Cart';

export class CartsClient extends BaseApiClient {

    constructor(request: APIRequestContext) {
        super(request);
    }

    async getCarts(): Promise<ApiResult<CartsResponse>> {
        return this.get<CartsResponse>('/carts');
    }

    async getCart(id: number): Promise<ApiResult<Cart>> {
        return this.get<Cart>(`/carts/${id}`);
    }

    async getCartsByUser(userId: number): Promise<ApiResult<CartsResponse>> {
        return this.get<CartsResponse>(`/carts/user/${userId}`);
    }
}
