import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit, OnChanges {
  @Input() isDialogOpen?: boolean;
  @Output() closeDialog = new EventEmitter();

  fg: UntypedFormGroup = this.formBuilder.group({
    username: [undefined, [Validators.required]],
    password: [undefined, [Validators.required, Validators.minLength(8)]],
    passwordAgain: [undefined, [Validators.required]],
    sex: [undefined, [Validators.required]],
    dateOfBirth: [undefined, Validators.required],
    height: [
      undefined,
      [Validators.required, Validators.min(50), Validators.max(250)],
    ],
  });

  dateText: string = '';

  isFirstStepInRegistration: boolean = true;
  notRegistered: boolean = true;

  errors: {
    usernameExist?: boolean;
  } = {};

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly authService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const isDialogOpen = changes['isDialogOpen'].currentValue;
    if (isDialogOpen) {
      this.resetForm();
    }
  }

  ngOnInit(): void {}

  next($event: Event): void {
    $event.preventDefault();
    console.log(this.fg.value.sex);
    this.fg.controls['username'].markAsTouched();
    this.fg.controls['password'].markAsTouched();
    this.fg.controls['passwordAgain'].markAsTouched();
    const form = {
      username: this.fg.controls['username'],
      password: this.fg.controls['password'],
      passwordAgain: this.fg.controls['passwordAgain'],
    };
    if (
      form.username.invalid ||
      form.password.invalid ||
      form.passwordAgain.invalid
    ) {
      return;
    }
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

  submit(): void {
    console.log(this.fg.value);
    if (this.hasErrors()) return;
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
      .subscribe({
        next: (response) => {
          this.resetForm();
          this.notRegistered = false;
          setTimeout(() => {
            this.closeDialog.emit();
            this.notRegistered = true;
          }, 5000);
        },
        error: (error) => {
          if ('userAlreadyExist' in error.error) {
            this.isFirstStepInRegistration = true;
            this.errors.usernameExist = true;
            this.fg.controls['username'].invalid;
          }
        },
      });
  }

  hasErrors(): boolean {
    const secondFormPart = {
      sex: this.fg.controls['sex'],
      height: this.fg.controls['height'],
      dateOfBirth: this.fg.controls['dateOfBirth'],
    };
    secondFormPart.sex.markAsTouched();
    secondFormPart.height.markAsTouched();
    secondFormPart.dateOfBirth.markAsTouched();

    if (
      secondFormPart.dateOfBirth.invalid ||
      secondFormPart.sex.invalid ||
      secondFormPart.dateOfBirth.invalid ||
      (secondFormPart.sex.value !== 'male' &&
        secondFormPart.sex.value !== 'female')
    ) {
      return true;
    }
    return false;
  }

  resetForm(): void {
    this.fg.reset();
    this.isFirstStepInRegistration = true;
  }
}
