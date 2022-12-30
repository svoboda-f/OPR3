import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
})
export class NewEntryComponent implements OnInit, OnDestroy {
  @Input() events?: Observable<boolean>;
  event?: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.event = this.events?.subscribe((isDialogOpen) => {
      if(isDialogOpen) {
        //TODO
      }
    })
  }

  ngOnDestroy(): void {
    this.event?.unsubscribe();
  }
}
