import { Component } from '@angular/core';
import { Todo } from '../../shared/interfaces/todo.interface';
import { TodoComponent } from './todo/todo.component';
import { Observable, combineLatest, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as TodoActions from '../../store/todo.actions';
import { AppState } from '../../shared/interfaces/app-state.interface';
import {
  isLoadingSelector,
  todosSelector,
  todoDoneSelector,
  todoOpenSelector,
  errorSelector,
  filterSelector,
} from '../../store/todo.selector';
import {
  MatButtonToggleChange,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { FilterTodo } from '../../shared/filter-todo.enum';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  standalone: true,
  imports: [TodoComponent, CommonModule, MatButtonToggleModule],
})
export class TodoListComponent {
  filterOptions = Object.values(FilterTodo);
  defaultFilter$: Observable<FilterTodo> = this.store.select(filterSelector);
  todos$: Observable<Todo[]> = this.store.select(todosSelector);
  isLoading$: Observable<boolean> = this.store.select(isLoadingSelector);
  error$: Observable<string | null> = this.store.select(errorSelector);

  changeFilter($event: MatButtonToggleChange) {
    switch ($event.value) {
      case FilterTodo.All:
        this.store.dispatch(
          TodoActions.changeFilterTodo({ filter: FilterTodo.All })
        );
        this.todos$ = this.store.select(todosSelector);
        break;
      case FilterTodo.Done:
        this.store.dispatch(
          TodoActions.changeFilterTodo({ filter: FilterTodo.Done })
        );
        this.todos$ = this.store.select(todoDoneSelector);
        break;
      case FilterTodo.Open:
        this.store.dispatch(
          TodoActions.changeFilterTodo({ filter: FilterTodo.Open })
        );
        this.todos$ = this.store.select(todoOpenSelector);
        break;
    }
  }

  constructor(private store: Store<AppState>) {
    this.store.dispatch(TodoActions.getTodos());
    this.store.dispatch(TodoActions.getFilterTodo());

    this.todos$ = combineLatest([
      this.store.select(todosSelector),
      this.store.select(filterSelector),
    ]).pipe(
      map(([todos, filter]) => {
        switch (filter) {
          case FilterTodo.All:
            return todos;
          case FilterTodo.Done:
            return todos.filter((todo) => todo.completed);
          case FilterTodo.Open:
            return todos.filter((todo) => !todo.completed);
          default:
            return todos;
        }
      })
    );
  }
}
