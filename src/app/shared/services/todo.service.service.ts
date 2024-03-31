import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TodoWrapper } from '../interfaces/todo-wrapper.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  url = 'https://dummyjson.com/todos';

  getTodos(): Observable<Todo[]> {
    return this.http
      .get<TodoWrapper>(this.url + '/user/5')
      .pipe(map((response) => response.todos));
  }

  addTodo(todoTitle: string): Observable<Todo> {
    const todo: Todo = {
      todo: todoTitle,
      userId: 5,
      completed: false,
    };

    return this.http.post<Todo>(this.url + '/add', todo);
  }
  updateTodo() {}
  deleteTodo() {}
}
