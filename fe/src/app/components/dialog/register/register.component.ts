import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnChanges {
  @Input() isDialogOpen?: boolean;
  fg: FormGroup = this.formBuilder.group({
    username: [undefined],
    password: [undefined],
    passwordAgain: [undefined],
    sex: [''],
    dateOfBirth: [undefined],
    height: [undefined],
  });

  dateText: string = '';

  isFirstStepInRegistration: boolean = true;

  errors: {
    usernameLength?: boolean;
    usernameExist?: boolean;
    passwordLength?: boolean;
    passwordsDontMatch?: boolean;
  } = {};

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    const isDialogOpen = changes['isDialogOpen'].currentValue;
    if (isDialogOpen) {
      this.fg.reset();
      this.isFirstStepInRegistration = true;
    }
  }

  ngOnInit(): void {}

  next(): void {
    // this.fg.markAllAsTouched();
    const form = {
      username: this.fg.controls['username'],
      password: this.fg.controls['password'],
      passwordAgain: this.fg.controls['passwordAgain'],
    };
    // if (this.fg.errors) {
    //   return;
    // }
    if (form.password.value !== form.passwordAgain.value) {
      form.passwordAgain.setErrors({ incorrect: true });
      return;
    }
    this.isFirstStepInRegistration = false;
  }

  dateInputClick($event: Event): void {
    const target = $event.target as any;
    target.showPicker();
  }

  dateChange($event: Event): void {
    const target = $event.target as HTMLInputElement;
    this.dateText = target.value;
  }

  backClick(): void {
    this.isFirstStepInRegistration = true;
  }

  submit(): void {}
}
