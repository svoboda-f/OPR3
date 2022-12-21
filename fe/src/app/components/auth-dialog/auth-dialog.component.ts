import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
})
export class AuthDialogComponent implements OnInit {
  user$: Observable<boolean> = of(false);

  constructor() {}

  ngOnInit(): void {}
}
