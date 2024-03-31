import { Component, Inject, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoService } from './shared/services/todo.service.service';
import { _MatInternalFormField } from '@angular/material/core';
import { Observable } from 'rxjs';
import { Todo } from './shared/interfaces/todo.interface';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    TodoListComponent,
    _MatInternalFormField,
    BottomBarComponent,
    MatToolbarModule,
    NavBarComponent,
  ],
})
export class AppComponent {
  title = 'todoApp';

  constructor() {}
}
