import { BaseApiClient } from './BaseApiClient';
import type { APIRequestContext } from '@playwright/test';
import type { ApiResult } from '../models/ApiResult';
import type { Cart, CartsResponse } from '../models/Cart';
import type { CreateCartRequest } from '../models/CreateCartRequest';
import type { UpdateCartRequest } from '../models/UpdateCartRequest';
import type { DeleteCartResponse } from '../models/DeleteCartResponse';

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

    async createCart(newCart: CreateCartRequest): Promise<ApiResult<Cart>> {
        return this.post<Cart>('/carts/add', newCart);
    }

    async updateCart(id: number, updateCart: UpdateCartRequest): Promise<ApiResult<Cart>> {
        return this.put<Cart>(`/carts/${id}`, updateCart);
    }

    async deleteCart(id: number): Promise<ApiResult<DeleteCartResponse>> {
        return this.delete<DeleteCartResponse>(`/carts/${id}`);
    }
}
