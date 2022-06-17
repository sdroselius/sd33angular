import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private baseUrl = 'http://localhost:8086/';
  private url = this.baseUrl + 'api/todos';

  constructor( private http: HttpClient ) { }

  index(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.index(): error retrieving todos: ' + err)
        );
      })
    );
  }

  show(id: number): Observable<Todo> {
    return this.http.get<Todo>(this.url + '/' + id).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.show(): error retrieving todo: ' + err)
        );
      })
    );
  }


  create(todo: Todo): Observable<Todo> {
    todo.completed = false;
    todo.description = '';
    return this.http.post<Todo>(this.url, todo).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.create(): error creating todo: ' + err)
        );
      })
    );
  }

  update(todo: Todo): Observable<Todo> {
    // return this.http.put<Todo>(this.url + "/" + todo.id, todo).pipe(
    return this.http.put<Todo>(`${this.url}/${todo.id}`, todo).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.update(): error updating todo: ' + err)
        );
      })
    );
  }

  destroy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TodoService.delete(): error deleting todo: ' + err)
        );
      })
    );
  }

}
