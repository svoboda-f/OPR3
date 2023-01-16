import { DOCUMENT } from '@angular/common';
import { HttpStatusCode } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnChanges {
  @Input() isDialogOpen?: boolean;
  @Output() closeDialog = new EventEmitter<boolean>();

  invalidCredentialsError: boolean | null = null;

  fg: UntypedFormGroup = this.formBuilder.group({
    username: [undefined, Validators.required],
    password: [undefined, Validators.required],
  });

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const isDialogOpen = changes['isDialogOpen'].currentValue;
    if (isDialogOpen) {
      this.invalidCredentialsError = null;
      this.fg.reset();
    }
  }

  submit(): void {
    this.fg.markAllAsTouched();
    if(this.fg.invalid) return;
    this.authService
      .login(
        this.fg.controls['username'].value,
        this.fg.controls['password'].value
      )
      .subscribe({
        next: (value) => {
          this.invalidCredentialsError = null;
          this.userService.refreshUser();
          this.closeDialog.emit(false);
        },
        error: (error) =>{
          if(error.status === HttpStatusCode.Unauthorized && 'error' in error.error) {
            this.invalidCredentialsError = true;
          }
        }
      });
  }
}
