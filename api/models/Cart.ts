export interface Cart {
    id: number;
    userId: number;
    products: CartProduct[];
    total: number;
    totalProducts: number;
    totalQuantity: number;
}

export interface CartProduct {
    id: number;
    title: string;
    price: number;
    quantity: number;
    thumbnail: string;
}

export interface CartsResponse {
    carts: Cart[];
    total: number;
    skip: number;
    limit: number;
}
