import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo.interface';
import { Observable, of } from 'rxjs';
import { FilterTodo } from '../filter-todo.enum';

@Injectable({
  providedIn: 'root',
})
export class TodoLocalStorageService {
  constructor() {}

  private getTodosFromStorage(): Todo[] {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
  }

  private saveTodosToStorage(todos: Todo[]): void {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  getTodos(): Observable<Todo[]> {
    const todos = this.getTodosFromStorage();
    return of(todos);
  }

  addTodo(todoTitle: string, tags?: string[]): Observable<Todo> {
    const todos = this.getTodosFromStorage();
    const newTodo: Todo = {
      id: new Date().getTime().toString(),
      todo: todoTitle,
      userId: 5,
      completed: false,
      tags: tags,
    };
    todos.push(newTodo);
    this.saveTodosToStorage(todos);
    return of(newTodo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    let todos = this.getTodosFromStorage();
    const index = todos.findIndex((t) => t.id === todo.id);

    todos[index] = todo;
    this.saveTodosToStorage(todos);
    return of(todo);
  }

  deleteTodo(todoId: string): Observable<{}> {
    let todos = this.getTodosFromStorage();
    todos = todos.filter((t) => t.id !== todoId);
    this.saveTodosToStorage(todos);
    return of({}); // Return an empty object to signify completion
  }

  setTodoFilter(filter: FilterTodo): Observable<FilterTodo> {
    localStorage.setItem('filter', filter);
    return of(filter);
  }

  getTodoFilter(): Observable<FilterTodo> {
    const filter = localStorage.getItem('filter') as FilterTodo;
    return of(filter);
  }
}
