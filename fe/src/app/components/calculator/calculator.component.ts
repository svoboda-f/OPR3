import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Sex } from 'src/app/enums/sex';
import { CalculatorEntry } from 'src/app/models/calculator-entry';
import { CalculatorService } from 'src/app/services/calculator.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
})
export class CalculatorComponent implements OnInit {
  active: boolean = true;

  ageError = {
    type: 'empty',
    message: '',
  };

  entries: CalculatorEntry[] = [];

  calculatorResult: UntypedFormGroup = this.formBuilder.group({
    age: new UntypedFormControl(undefined),
    sex: new UntypedFormControl('male'),
    height: new UntypedFormControl(undefined),
    weight: new UntypedFormControl(undefined),
  });

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly calculatorService: CalculatorService
  ) {}

  ngOnInit(): void {
    this.entries = this.localStorageService.getCalculatorEntries();
  }

  tabClick($event: Event): void {
    const event = $event.target as HTMLButtonElement;
    this.active = event.id === 'calculator-tab';
  }

  calculate(): void {
    const date = new Date().toISOString().split('T')[0];
    const sex = this.calculatorResult.controls['sex'].value === 'male' ? Sex.MALE : Sex.FEMALE;
    const entry: CalculatorEntry = {
      date: date,
      age: this.calculatorResult.controls['age'].value,
      sex: sex,
      height: this.calculatorResult.controls['height'].value,
      weight: this.calculatorResult.controls['weight'].value,
    };
    this.calculatorService.calculateBMI(entry);
    this.calculatorService.calculateBMR(entry);
    this.entries.unshift(entry);
    if(this.entries.length > 5) {
      this.entries.pop();
    }
    this.localStorageService.saveCalculatorEntries(this.entries);
    this.active = false;
    this.calculatorResult.reset();
  }

  deleteCalculatorEntries(): void {
    this.localStorageService.deleteCalculatorEntries();
    this.entries = [];
    this.active = true;
    this.calculatorResult.patchValue({sex: 'male'});
  }
}
