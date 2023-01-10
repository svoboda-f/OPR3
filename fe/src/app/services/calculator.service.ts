import { Injectable } from '@angular/core';
import { Sex } from '../enums/sex';
import { CalculatorEntry } from '../models/calculator-entry';
import { Entry } from '../models/entry';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor() {}

  calculateBMI(entry: CalculatorEntry | Entry, height: number = 0) {
    const _height = 'height' in entry ? entry.height : height;
    const heightInMeters = _height / 100;
    entry.bmi =
      Math.round((entry.weight / (heightInMeters * heightInMeters)) * 10) / 10;
  }

  calculateBMR(entry: CalculatorEntry | Entry, height: number = 0, sex: Sex = Sex.MALE, dateOfBirth: Date = new Date()) {
    const _sex = 'sex' in entry ? entry.sex : sex;
    const _height = 'height' in entry ? entry.height : height;
    const _age = 'age' in entry ? entry.age : this.calculateAge(dateOfBirth);

    const bmrSexNumber: number = _sex === Sex.FEMALE ? -161 : 5;
    entry.bmr = Math.round(
      10 * entry.weight + 6.25 * _height - 5 * _age + bmrSexNumber
    );1
  }

  private calculateAge(dateOfBirth: Date) {
    return Math.floor((new Date().getTime() - new Date(dateOfBirth).getTime()) / 3.15576e+10);
  }
}
