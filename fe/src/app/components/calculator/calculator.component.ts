import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
})
export class CalculatorComponent implements OnInit {

  active: boolean = true;

  ageError = {
    type: "empty",
    message: ""
  }

  entries = undefined;

  constructor() { }

  ngOnInit(): void {
  }

  calculatorClick(): void {
    this.active = true;
  }

  resultsClick(): void {
    this.active = false;
  }
}
