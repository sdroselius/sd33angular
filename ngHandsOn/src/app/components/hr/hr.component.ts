import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.css']
})
export class HrComponent implements OnInit {

  employee = new Employee();
  locations = ['Los Angeles', 'Austin', 'Kansas City', 'Denver'];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit():void {
    console.log(this.employee);
  }

}
