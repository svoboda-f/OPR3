import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  @Input() events?: Observable<boolean>;
  event?: Subscription;

  fg: FormGroup = this.formBuilder.group({
    username: [undefined],
    password: [undefined]
  });

  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.event = this.events?.subscribe((isDialogOpen) => {
      if(isDialogOpen) {
        this.fg.reset();
      }
    })
  }

  ngOnDestroy(): void {
    this.event?.unsubscribe();
  }

  submit(): void {
    
  }

}
