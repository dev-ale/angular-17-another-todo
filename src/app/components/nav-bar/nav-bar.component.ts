import { Component, Input, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { todosSelector, tagsSelector } from '../../store/todo.selector';
import { Observable, map, of } from 'rxjs';
import { Todo } from '../../shared/interfaces/todo.interface';
import { AppState } from '../../shared/interfaces/app-state.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: true,
  imports: [MatToolbarModule, CommonModule],
})
export class NavBarComponent implements OnInit {
  @Input() title!: string;
  todosCount$: Observable<number> = this.store
    .select(todosSelector)
    .pipe(map((todos) => todos.length));

  allTags$: Observable<string[]> = this.store.select(tagsSelector);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}
}
