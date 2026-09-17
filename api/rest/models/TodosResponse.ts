import type { Todo } from './Todo';

export interface TodosResponse {
    todos: Todo[];
    total: number;
    skip: number;
    limit: number;
}
