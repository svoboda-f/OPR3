import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Entry } from 'src/app/models/entry';
import { DiaryService } from 'src/app/services/diary.service';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
})
export class NewEntryComponent implements OnInit, OnChanges {
  @Input() isDialogOpen?: boolean;
  @Output() closeDialog = new EventEmitter<boolean>();

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
      this.fg.markAsUntouched();
    }
  }

  dateInputClick($event: Event): void {
    const target = $event.target as any;
    target.showPicker();
  }

  dateChange($event: Event): void {
    const target = $event.target as HTMLInputElement;
    this.dateText = target.value;
  }

  submit(): void {
    this.fg.markAllAsTouched();
    const newEntry: Entry = {
      date: this.fg.controls['date'].value,
      weight: this.fg.controls['weight'].value
    }
    if(this.fg.invalid) {
      return;
    }
    this.diary.newEntry(newEntry);
    this.fg.patchValue({'weight': undefined, 'date': this.today.toISOString()});
    this.fg.markAsUntouched();
    this.closeDialog.emit(false);
  }
}
