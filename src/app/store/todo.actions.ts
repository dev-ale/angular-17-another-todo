import { createAction, props } from '@ngrx/store';
import { TodoWrapper } from '../shared/interfaces/todo-wrapper.interface';
import { Todo } from '../shared/interfaces/todo.interface';
import { FilterTodo } from '../shared/filter-todo.enum';

//GET TODOS
export const getTodos = createAction('[Todo] Get Todos');
export const getTodosSuccess = createAction(
  '[Todo] Get Todos Success',
  props<{ todos: Todo[] }>()
);
export const getTodosFailure = createAction(
  '[Todo] Get Todos Failure',
  props<{ error: string }>()
);

//ADD TODO
export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ todoMessage: string; tags: string[] }>()
);
export const addTodoSuccess = createAction(
  '[Todo] Add Todo Success',
  props<{ todo: Todo }>()
);
export const addTodoFailure = createAction(
  '[Todo] Add Todo Failure',
  props<{ error: string }>()
);

//REMOVE TODO
export const removeTodo = createAction(
  '[Todo] Remove Todo',
  props<{ todo: Todo }>()
);
export const removeTodoSuccess = createAction(
  '[Todo] Remove Todo Success',
  props<{ todo: Todo }>()
);
export const removeTodoFailure = createAction(
  '[Todo] Remove Todo Failure',
  props<{ error: string }>()
);

//TOGGLE TODO
export const toggleTodo = createAction(
  '[Todo] Toggle Todo',
  props<{ todo: Todo }>()
);
export const toggleTodoSuccess = createAction(
  '[Todo] Toggle Todo Success',
  props<{ todo: Todo }>()
);
export const toggleTodoFailure = createAction(
  '[Todo] Toggle Todo Failure',
  props<{ error: string }>()
);

// FILTER TODO
export const changeFilterTodo = createAction(
  '[Todo] Change Filter Todo',
  props<{ filter: FilterTodo }>()
);

export const getFilterTodo = createAction('[Todo] Get Filter Todo');
