import { Injectable } from '@angular/core';
import { TodoService } from '../shared/services/todo.service.service';
import {
  EMPTY,
  catchError,
  exhaustMap,
  map,
  merge,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import * as TodoActions from './todo.actions';
import { ActionCreator } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Todo } from '../shared/interfaces/todo.interface';
import { TodoLocalStorageService } from '../shared/services/todo-localstorage.service';

@Injectable()
export class TodoEffects {
  getTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.getTodos),
      mergeMap(() =>
        this.todoService.getTodos().pipe(
          map((todos) => TodoActions.getTodosSuccess({ todos })),
          catchError((error) =>
            of(TodoActions.getTodosFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodo),
      mergeMap((action) =>
        this.todoService.addTodo(action.todoMessage, action.tags).pipe(
          map((todo) => TodoActions.addTodoSuccess({ todo: todo })),
          catchError((error) => {
            return of(TodoActions.addTodoFailure({ error: error.message }));
          })
        )
      )
    )
  );

  toggleTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.toggleTodo),
      mergeMap((action) =>
        this.todoService.updateTodo(action.todo).pipe(
          map((todo) => TodoActions.toggleTodoSuccess({ todo: todo })),
          catchError((error) =>
            of(TodoActions.toggleTodoFailure({ error: error.message }))
          )
        )
      )
    )
  );

  removeTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.removeTodo),
      mergeMap((action) =>
        this.todoService.deleteTodo(action.todo.id!).pipe(
          map((todo) => TodoActions.removeTodoSuccess({ todo: action.todo })),
          catchError((error) =>
            of(TodoActions.removeTodoFailure({ error: error.message }))
          )
        )
      )
    )
  );

  setFilterTodo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoActions.changeFilterTodo),
        tap((action) => {
          this.todoService.setTodoFilter(action.filter);
        })
      ),
    { dispatch: false }
  );

  getFilterTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.getFilterTodo),
      mergeMap(() =>
        this.todoService.getTodoFilter().pipe(
          map((filter) => TodoActions.changeFilterTodo({ filter })),
          catchError((error) => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private todoService: TodoLocalStorageService
  ) {}
}
