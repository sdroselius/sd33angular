import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  title = 'ngTodo';

  todos: Todo[] = [];

  selected: Todo | null = null;
  newTodo: Todo | null = new Todo();
  editTodo: Todo | null = null;

  constructor(
    private todoServ: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let idStr = this.route.snapshot.paramMap.get('id');

    if (!this.selected && idStr) {
      let idNum = Number.parseInt(idStr);

      if (!isNaN(idNum)) {
        this.todoServ.show(idNum).subscribe({
          next: (theTodo) => {
            this.selected = theTodo;
          },
          error: (fail) => {
            this.router.navigateByUrl('/todoNotFound');
          },
        });

      } else {
        this.router.navigateByUrl('/invalidTodoId');
      }
    }
    this.reload();
  }

  reload(): void {
    this.todoServ.index().subscribe({
      next: (todos) => {
        this.todos = todos;
      },
      error: (fail) => {
        console.error('TodoListComponent.reload: error');
        console.error(fail);
      },
    });
  }

  getTodoCount(): number {
    return this.todos.length;
  }

  displayTodo(todo: Todo): void {
    this.selected = todo;
  }

  displayTable(): void {
    this.selected = null;
  }

  addTodo(todo: Todo) {
    this.todoServ.create(todo).subscribe({
      next: (newTodo) => {
        this.reload();
        this.newTodo = new Todo();
      },
      error: (fail) => {
        console.error('TodoListComponent.addTodo: error adding todo');
        console.error(fail);
      },
    });
  }

  setEditTodo(): void {
    this.editTodo = Object.assign({}, this.selected);
  }

  updateTodo(todo: Todo, setSelected: boolean = true): void {
    this.todoServ.update(todo).subscribe({
      next: (updated) => {
        this.reload();
        if (setSelected) {
          this.selected = updated; // back to detail view
          // this.selected = null; // back to list
        }
        this.editTodo = null;
      },
      error: (nojoy) => {
        console.error('TodoListComponent.updateTodo: error on update');
        console.error(nojoy);
      },
    });
  }

  deleteTodo(id: number): void {
    this.todoServ.destroy(id).subscribe({
      next: () => {
        this.reload();
      },
      error: (zap) => {
        console.error('TodoListComponent.deleteTodo: error on destroy');
        console.error(zap);
      },
    });
  }
}
