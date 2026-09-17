import { test, expect } from '@playwright/test';
import { TodosClient } from '../../../api/rest/clients/TodosClient';
import type { CreateTodoRequest } from '../../../api/rest/models/CreateTodoRequest';
import type { UpdateTodoRequest } from '../../../api/rest/models/UpdateTodoRequest';

test.describe('Todos API Tests', () => {

    test('should retrieve all todos', async ({ request }) => {
        const todosClient = new TodosClient(request);

        const result = await todosClient.getTodos();

        expect(result.status).toBe(200);
        expect(result.body.todos.length).toBeGreaterThan(0);
        expect(result.body.total).toBeGreaterThan(0);
        expect(result.body.skip).toBe(0);
        expect(result.body.limit).toBeGreaterThan(0);
    });

    test('should retrieve todo by id', async ({ request }) => {
        const todosClient = new TodosClient(request);

        const todoId = 1;

        const result = await todosClient.getTodo(todoId);

        expect(result.status).toBe(200);
        expect(result.body.id).toBe(todoId);
        expect(result.body.todo.length).toBeGreaterThan(0);
        expect(typeof result.body.completed).toBe('boolean');
        expect(result.body.userId).toBeGreaterThan(0);
    });

    test('should create a new todo', async ({ request }) => {
        const todosClient = new TodosClient(request);

        const newTodo: CreateTodoRequest = {
            todo: 'Learn Playwright API testing',
            completed: false,
            userId: 5
        };

        const result = await todosClient.createTodo(newTodo);

        expect(result.status).toBe(201);
        expect(result.body.id).toBeGreaterThan(0);
        expect(result.body.todo).toBe(newTodo.todo);
        expect(result.body.completed).toBe(newTodo.completed);
        expect(result.body.userId).toBe(newTodo.userId);
    });

    test('should update a todo', async ({ request }) => {
        const todosClient = new TodosClient(request);

        const todoId = 1;

        const updatedTodo: UpdateTodoRequest = {
            completed: true
        };

        const result = await todosClient.updateTodo(todoId, updatedTodo);

        expect(result.status).toBe(200);
        expect(result.body.id).toBe(todoId);
        expect(result.body.completed).toBe(updatedTodo.completed);
    });

    test('should delete a todo', async ({ request }) => {
        const todosClient = new TodosClient(request);
        
        const todoId = 1;

        const result = await todosClient.deleteTodo(todoId);

        expect(result.status).toBe(200);
        expect(result.body.id).toBe(todoId);
        expect(typeof result.body.completed).toBe('boolean');
        expect(result.body.todo.length).toBeGreaterThan(0);
        expect(result.body.userId).toBeGreaterThan(0);
        expect(result.body.isDeleted).toBe(true);
        expect(result.body.deletedOn).toBeTruthy();
        expect(Date.parse(result.body.deletedOn)).not.toBeNaN();
    });
});
