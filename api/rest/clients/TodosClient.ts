import type { APIRequestContext } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import type { ApiResult } from '../models/ApiResult';
import type { TodosResponse } from '../models/TodosResponse';
import type { Todo } from '../models/Todo';
import type { CreateTodoRequest } from '../models/CreateTodoRequest';
import type { UpdateTodoRequest } from '../models/UpdateTodoRequest';
import type { DeleteTodoResponse } from '../models/DeleteTodoResponse';

export class TodosClient extends BaseApiClient {

    constructor(request: APIRequestContext) {
        super(request);
    }

    async getTodos(): Promise<ApiResult<TodosResponse>> {
        return this.get<TodosResponse>('/todos');
    }

    async getTodo(id: number): Promise<ApiResult<Todo>> {
        return this.get<Todo>(`/todos/${id}`);
    }

    async createTodo(newTodo: CreateTodoRequest): Promise<ApiResult<Todo>> {
        return this.post<Todo>('/todos/add', newTodo);
    }

    async updateTodo(id: number, updatedTodo: UpdateTodoRequest): Promise<ApiResult<Todo>> {
        return this.put<Todo>(`/todos/${id}`, updatedTodo);
    }

    async deleteTodo(id: number): Promise<ApiResult<DeleteTodoResponse>> {
        return this.delete<DeleteTodoResponse>(`/todos/${id}`);
    }
}
