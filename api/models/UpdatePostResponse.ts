import type { Reactions } from './Post';

export interface UpdatePostResponse {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags: string[];
    reactions: Reactions;
}
