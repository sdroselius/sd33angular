import { Component } from '@angular/core';
export class Employee {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
  hireDate: string;
  isFullTime: boolean | undefined;

  constructor(
    firstName: string = '',
    lastName: string = '',
    age: number = 0,
    location: string = '',
    hireDate: string = '',
    isFullTime?: boolean
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.location = location;
    this.hireDate = hireDate;
    this.isFullTime = isFullTime;
  }
}
