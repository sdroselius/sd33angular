import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {

  header = 'Overview';
  person = {
    fname: 'Veronica',
    lname: 'Kessel',
    age: 32,
    stateOfBirth: 'New Mexico'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
