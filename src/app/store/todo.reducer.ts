import { createReducer, on } from '@ngrx/store';
import { TodoState } from '../shared/interfaces/todo-state.interface';
import * as TodoActions from './todo.actions';
import { FilterTodo } from '../shared/filter-todo.enum';

export const initialState: TodoState = {
  isLoading: false,
  todos: [],
  error: '',
  filter: FilterTodo.All,
};

export const todoReducer = createReducer(
  initialState,
  // GET TODOS
  on(TodoActions.getTodos, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(TodoActions.getTodosSuccess, (state, { todos }) => {
    return {
      ...state,
      isLoading: false,
      todos,
    };
  }),
  on(TodoActions.getTodosFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  }),
  // ADD TODO
  on(TodoActions.addTodo, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(TodoActions.addTodoSuccess, (state, { todo }) => {
    return {
      ...state,
      isLoading: false,
      todos: [...state.todos, todo],
    };
  }),
  on(TodoActions.addTodoFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  }),
  // REMOVE TODO
  on(TodoActions.removeTodo, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(TodoActions.removeTodoSuccess, (state, { todo }) => {
    return {
      ...state,
      isLoading: false,
      todos: state.todos.filter((t) => t.id !== todo.id),
    };
  }),
  on(TodoActions.removeTodoFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  }),
  // TOGGLE TODO
  on(TodoActions.toggleTodo, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(TodoActions.toggleTodoSuccess, (state, { todo }) => {
    return {
      ...state,
      isLoading: false,
      todos: state.todos.map((t) =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      ),
    };
  }),
  on(TodoActions.toggleTodoFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  }),
  // CHANGE FILTER TODO
  on(TodoActions.changeFilterTodo, (state, { filter }) => {
    return {
      ...state,
      filter,
    };
  }),
  // GET FILTER TODO
  on(TodoActions.getFilterTodo, (state) => {
    return {
      ...state,
    };
  })
);
