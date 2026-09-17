export interface UpdateCartRequest {
    merge: boolean;
    products: UpdateCartProduct[];
}

export interface UpdateCartProduct {
    id: number;
    quantity: number;
}
