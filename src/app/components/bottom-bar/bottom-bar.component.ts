import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/interfaces/app-state.interface';
import * as TodoActions from '../../store/todo.actions';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.css'],
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbar,
    MatIcon,
    ReactiveFormsModule,
  ],
})
export class BottomBarComponent {
  form: FormGroup;

  onSubmit() {
    const messageWords = this.form.value.todo.split(' ');

    const tags = [];
    let cleanedMessageWords = [];

    for (const word of messageWords) {
      if (word.startsWith('#')) {
        tags.push(word.slice(1));
      } else {
        cleanedMessageWords.push(word);
      }
    }

    const cleanedMessage = cleanedMessageWords.join(' ');

    this.resetForm();
    this.store.dispatch(
      TodoActions.addTodo({ todoMessage: cleanedMessage, tags })
    );
  }

  onEnterKeyPressed() {
    if (this.form.invalid) {
      return;
    }
    this.onSubmit();
  }

  private resetForm() {
    this.form.reset();
  }

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.form = this.fb.group({
      todo: ['', Validators.required],
    });
  }
}
