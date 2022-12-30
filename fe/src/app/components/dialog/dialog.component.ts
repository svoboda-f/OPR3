import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit {
  user$: Observable<boolean> = of(true);

  isDialogOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  dialogClose($event: Event): void {
    const target = $event.target as HTMLInputElement;
    this.isDialogOpen = target.checked;
  }
}
