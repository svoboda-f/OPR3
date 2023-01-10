import { DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnChanges {
  @Input() isDialogOpen?: boolean;

  fg: FormGroup = this.formBuilder.group({
    username: [undefined],
    password: [undefined],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    @Inject(DOCUMENT) public document: Document
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const isDialogOpen = changes['isDialogOpen'].currentValue;
    if (isDialogOpen) {
      this.fg.reset();
    }
  }

  submit(): void {
    this.authService
      .login(
        this.fg.controls['username'].value,
        this.fg.controls['password'].value
      )
      .subscribe({
        next: (value) => {
          console.log(value);
          this.userService.refreshUser();
          const dialog: HTMLInputElement | null = this.document.getElementById('auth-dialog') as HTMLInputElement;
          dialog.checked = false;
        },
      });
  }
}
