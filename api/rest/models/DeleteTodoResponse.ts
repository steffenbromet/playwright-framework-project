import type { Todo } from './Todo';

export interface DeleteTodoResponse extends Todo {
    isDeleted: boolean;
    deletedOn: string;
}
