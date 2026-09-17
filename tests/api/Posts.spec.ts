import { test, expect } from '@playwright/test';
import { PostsClient } from '../../api/clients/PostsClient';
import { CreatePostRequest } from '../../api/models/CreatePostRequest';
import { UpdatePostRequest } from '../../api/models/UpdatePostRequest';

test.describe('Posts API Tests', () => {

    test('should retrieve all posts', async ({ request }) => {
        const postsClient = new PostsClient(request);

        const result = await postsClient.getPosts();

        expect(result.body.posts.length).toBeGreaterThan(0);
        expect(result.body.total).toBeGreaterThan(0);
        expect(result.body.skip).toBe(0);
        expect(result.body.limit).toBeGreaterThan(0);
    });

    test('should retrieve post by id', async ({ request }) => {
        const postsClient = new PostsClient(request);

        const postId = 1;

        const result = await postsClient.getPost(postId);

        expect(result.status).toBe(200);

        expect(result.body.id).toBe(postId);
        expect(result.body.title).toBeTruthy();
        expect(result.body.title.length).toBeGreaterThan(0);
        expect(result.body.userId).toBeGreaterThan(0);
        expect(result.body.tags.length).toBeGreaterThan(0);
        expect(result.body.views).toBeGreaterThanOrEqual(0);
        expect(result.body.reactions.likes).toBeGreaterThanOrEqual(0);
        expect(result.body.reactions.dislikes).toBeGreaterThanOrEqual(0);
    });

    test('should create a new post', async ({ request }) => {
        const postsClient = new PostsClient(request);

        const newPost: CreatePostRequest = {
            title: 'Playwright API Testing',
            body: 'Learning API test automation with Playwright and TypeScript',
            userId: 5
        };

        const result = await postsClient.createPost(newPost);

        expect(result.status).toBe(201);
        expect(result.body.id).toBeGreaterThan(0);
        expect(result.body.title).toBe(newPost.title);
        expect(result.body.body).toBe(newPost.body);
        expect(result.body.userId).toBe(newPost.userId);
    });

    test('should update a post', async ({ request }) => {
        const postsClient = new PostsClient(request);

        const postId = 1;

        const updatedPost: UpdatePostRequest = {
            title: 'Updated Playwright API Testing'
        };

        const result = await postsClient.updatePost(postId, updatedPost);

        expect(result.status).toBe(200);
        expect(result.body.id).toBe(postId);
        expect(result.body.title).toBe(updatedPost.title);
    });

    test('should delete a post', async ({ request }) => {
        const postClient = new PostsClient(request);
        
        const postId = 1;

        const result = await postClient.deletePost(postId);

        expect(result.status).toBe(200);
        expect(result.body.id).toBe(postId);
        expect(result.body.isDeleted).toBe(true);
        expect(result.body.deletedOn).toBeTruthy();
    });

    test('should retrieve a post by user', async ({ request }) => {
        const postsClient = new PostsClient(request);

        const userId = 5;

        const result = await postsClient.getPostsByUser(userId);

        expect(result.status).toBe(200);
        expect(result.body.posts.length).toBeGreaterThan(0);

        for (const post of result.body.posts) {
            expect(post.userId).toBe(userId);
        }
    });

    test('should retrieve posts using a search query', async ({ request }) => {
        const postsClient = new PostsClient(request);

        const searchQuery = 'love';

        const result = await postsClient.searchPosts(searchQuery);

        expect(result.status).toBe(200);
        expect(result.body.posts.length).toBeGreaterThan(0);
    });
});
