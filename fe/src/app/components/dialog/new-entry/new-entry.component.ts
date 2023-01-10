import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Entry } from 'src/app/models/entry';
import { DiaryService } from 'src/app/services/diary.service';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
})
export class NewEntryComponent implements OnInit, OnChanges {
  @Input() isDialogOpen?: boolean;
  event?: Subscription;

  constructor(private readonly diary: DiaryService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const isDialogOpen = changes['isDialogOpen'].currentValue;
    if (isDialogOpen) {
      // this.fg.reset();
      // this.isFirstStepInRegistration = true;
    }
  }
}
