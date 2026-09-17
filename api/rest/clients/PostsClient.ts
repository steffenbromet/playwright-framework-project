import type { APIRequestContext } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import type { ApiResult } from '../models/ApiResult';
import type { PostsResponse } from '../models/PostResponse';
import type { Post } from '../models/Post';
import type { CreatePostRequest } from '../models/CreatePostRequest';
import type { CreatePostResponse } from '../models/CreatePostResponse';
import type { UpdatePostRequest } from '../models/UpdatePostRequest';
import type { UpdatePostResponse } from '../models/UpdatePostResponse';
import type { DeletePostResponse } from '../models/DeletePostResponse';

export class PostsClient extends BaseApiClient {
    
    constructor(request: APIRequestContext) {
        super(request);
    }

    async getPosts(): Promise<ApiResult<PostsResponse>> {
        return this.get<PostsResponse>('/posts');
    }

    async getPost(id: number): Promise<ApiResult<Post>> {
        return this.get<Post>(`/posts/${id}`);
    }

    async createPost(newPost: CreatePostRequest): Promise<ApiResult<CreatePostResponse >> {
        return this.post<CreatePostResponse >('/posts/add',newPost);
    }

    async updatePost(id: number, updatedPost: UpdatePostRequest): Promise<ApiResult<UpdatePostResponse>> {
        return this.put<UpdatePostResponse>(`/posts/${id}`,updatedPost);
    }

    async deletePost(id: number): Promise<ApiResult<DeletePostResponse>> {
        return this.delete<DeletePostResponse>(`/posts/${id}`);
    }

    async getPostsByUser(userId: number): Promise<ApiResult<PostsResponse>> {
        return this.get<PostsResponse>(`/posts/user/${userId}`);
    }

    async searchPosts(query: string): Promise<ApiResult<PostsResponse>> {
        return this.get<PostsResponse>(`/posts/search?q=${encodeURIComponent(query)}`);
    }
}
