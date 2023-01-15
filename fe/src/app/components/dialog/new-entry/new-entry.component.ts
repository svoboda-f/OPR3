import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { tmpdir } from 'os';
import { Observable, Subscription } from 'rxjs';
import { Entry } from 'src/app/models/entry';
import { DiaryService } from 'src/app/services/diary.service';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
})
export class NewEntryComponent implements OnInit, OnChanges {
  @Input() isDialogOpen?: boolean;
  @Output() closeDialog = new EventEmitter();

  today: Date = new Date();
  dateText: string = this.today.toISOString().split('T')[0];

  fg: UntypedFormGroup = this.formBuilder.group({
    date: [this.today.toISOString(), [Validators.required]],
    weight: [
      undefined,
      [Validators.required, Validators.min(1), Validators.max(500)],
    ],
  });

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly diary: DiaryService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const isDialogOpen = changes['isDialogOpen'].currentValue;
    if (isDialogOpen) {
      this.fg.patchValue({'weight': undefined, 'date': this.today.toISOString()});
      // this.fg.markAsUntouched();
      // this.fg.reset();
      console.log(this.fg.controls);
    }
  }

  dateInputClick($event: Event): void {
    const target = $event.target as any;
    target.showPicker();
    console.log(target.value);
  }

  dateChange($event: Event): void {
    const target = $event.target as HTMLInputElement;
    this.dateText = target.value;
  }

  submit(): void {
    const newEntry: Entry = {
      date: this.fg.controls['date'].value,
      weight: this.fg.controls['weight'].value
    }
    if(this.fg.invalid) {
      console.log("invalid")
      return;
    }
    this.diary.newEntry(newEntry);
    this.fg.patchValue({'weight': undefined, 'date': this.today.toISOString()});
    this.closeDialog.emit();
  }
}
