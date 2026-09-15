import type { Cart } from './Cart';

export interface DeleteCartResponse extends Cart {
    isDeleted: boolean;
    deletedOn: string;
}
