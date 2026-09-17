import type { Product } from './Product';

export interface DeleteProductResponse extends Product {
    isDeleted: boolean;
    deletedOn: string;
}
