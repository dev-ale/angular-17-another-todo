import { createSelector } from '@ngrx/store';
import { AppState } from '../shared/interfaces/app-state.interface';
import { TodoState } from '../shared/interfaces/todo-state.interface';

export const selectT = (state: AppState) => state.todos;

export const isLoadingSelector = createSelector(
  selectT,
  (state: TodoState) => state.isLoading
);

export const todosSelector = createSelector(
  selectT,
  (state: TodoState) => state.todos
);

export const todoDoneSelector = createSelector(todosSelector, (todos) =>
  todos.filter((todo) => todo.completed)
);

export const todoOpenSelector = createSelector(todosSelector, (todos) =>
  todos.filter((todo) => !todo.completed)
);

export const errorSelector = createSelector(
  selectT,
  (state: TodoState) => state.error
);

export const filterSelector = createSelector(
  selectT,
  (state: TodoState) => state.filter
);

export const tagsSelector = createSelector(todosSelector, (todos) => {
  const tags = new Set<string>();
  todos.forEach((todo) => {
    todo.tags?.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags);
});
