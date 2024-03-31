import { FilterTodo } from '../filter-todo.enum';
import { Todo } from './todo.interface';

export interface TodoState {
  isLoading: boolean;
  todos: Todo[];
  error: string;
  filter: FilterTodo;
}
