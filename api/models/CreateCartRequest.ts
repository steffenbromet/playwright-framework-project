export interface CreateCartRequest {
    userId: number;
    products: CreateCartProduct[];
}

export interface CreateCartProduct {
    id: number;
    quantity: number;
}
