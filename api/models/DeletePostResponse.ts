import type { Post } from './Post';

export interface DeletePostResponse extends Post {
    isDeleted: boolean;
    deletedOn: string;
}
