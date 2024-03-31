import { Todo } from './todo.interface';

export interface TodoWrapper {
  todos: Todo[];
  limit: number;
  skip: number;
  total: number;
}
