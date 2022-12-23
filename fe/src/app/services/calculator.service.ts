import { Injectable } from '@angular/core';
import { Sex } from '../enums/sex';
import { CalculatorEntry } from '../models/calculator-entry';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor() {}

  calculateBMI(entry: CalculatorEntry) {
    const heightInMeters = entry.height / 100;
    entry.bmi =
      Math.round((entry.weight / (heightInMeters * heightInMeters)) * 10) / 10;
  }

  calculateBMR(entry: CalculatorEntry) {
    const s: number = entry.sex === Sex.FEMALE ? -161 : 5;
    entry.bmr = Math.round(
      10 * entry.weight + 6.25 * entry.height - 5 * entry.age + s
    );
  }
}
