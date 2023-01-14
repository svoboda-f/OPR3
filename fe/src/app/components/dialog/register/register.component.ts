import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnChanges {
  @Input() isDialogOpen?: boolean;
  fg: UntypedFormGroup = this.formBuilder.group({
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

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly authService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const isDialogOpen = changes['isDialogOpen'].currentValue;
    if (isDialogOpen) {
      this.fg.reset();
      this.isFirstStepInRegistration = true;
    }
  }

  ngOnInit(): void {}

  next($event: Event): void {
    $event.preventDefault();
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
    console.log('next called');
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

  submit(): void {
    this.authService
      .register(
        this.fg.controls['username'].value,
        this.fg.controls['password'].value,
        {
          sex: this.fg.controls['sex'].value,
          height: this.fg.controls['height'].value,
          dateOfBirth: this.fg.controls['dateOfBirth'].value,
        }
      )
      .subscribe({ next: (response) => {console.log(response)}, error: (error) => {console.log(error)} });
  }
}
