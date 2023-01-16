import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DialogType } from 'src/app/enums/dialog-type';
import { UserInfo } from 'src/app/models/user-info';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit {
  @Input() user?: Observable<UserInfo>;

  isDialogOpen: boolean = false;
  @Input() dialogType?: DialogType;
  @ViewChild('dialog') dialogRef!: ElementRef<HTMLInputElement>;

  constructor() {}

  ngOnInit(): void {
    
  }

  dialogClose($event: Event): void {
    const target = $event.target as HTMLInputElement;
    this.isDialogOpen = target.checked;
  }

  closeDialog() {
    this.dialogRef.nativeElement.checked = false;
  }
}
