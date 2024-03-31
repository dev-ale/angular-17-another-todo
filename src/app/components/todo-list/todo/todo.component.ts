import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../../../shared/interfaces/todo.interface';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { AppState } from '../../../shared/interfaces/app-state.interface';
import { Store } from '@ngrx/store';
import * as TodoActions from '../../../store/todo.actions';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatIcon,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
})
export class TodoComponent {
  @Input() todo!: Todo;

  constructor(private store: Store<AppState>) {}

  delete(todo: Todo) {
    this.store.dispatch(TodoActions.removeTodo({ todo: todo }));
  }

  toggle(todo: Todo, $event: MatCheckboxChange) {
    this.store.dispatch(
      TodoActions.toggleTodo({
        todo: {
          ...todo,
          completed: $event.checked,
        },
      })
    );
  }
}
