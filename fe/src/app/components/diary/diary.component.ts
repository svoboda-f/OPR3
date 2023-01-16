import { Component, OnInit } from '@angular/core';
import { Entry } from 'src/app/models/entry';
import { UserInfo } from 'src/app/models/user-info';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { CalculatorService } from 'src/app/services/calculator.service';
import { DiaryService } from 'src/app/services/diary.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
})
export class DiaryComponent implements OnInit {
  user?: UserInfo;

  pages?: number[];
  numberOfPages?: number | null;
  sizes: number[] = [5, 10, 20];
  size: number = this.sizes[0];

  currentPage: number = 1;
  entries: Entry[] = [];
  selectedEntry: Entry | null = null;
  diaryType = 'table';
  toggleButtonText = 'Graf';

  constructor(
    private readonly diary: DiaryService,
    private readonly authGuard: AuthGuardService,
    private readonly calculator: CalculatorService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    if (!this.authGuard.canActivate()) return;

    this.userService
      .getCurrentUser()
      .subscribe((responese) => (this.user = responese));
    this.fetchEntries();
    this.diary.getEntries().subscribe((entries) => {
      this.entries = entries;
      this.numberOfPages = this.diary.getNumberOfPages();
      this.entries.forEach((entry) => {
        this.calculator.calculateBMI(entry, this.user?.height);
        this.calculator.calculateBMR(
          entry,
          this.user?.height,
          this.user?.sex,
          this.user?.dateOfBirth
        );
      });
    });
  }

  fetchEntries(): void {
    this.diary.fetchEntries();
  }

  btnNextClick(): void {
    this.currentPage++;
    this.diary.offset++;
    this.selectedEntry = null;
    this.fetchEntries();
  }

  btnPreviousClick(): void {
    this.currentPage--;
    this.diary.offset--;
    this.selectedEntry = null;
    this.fetchEntries();
  }

  sizesValueChange($event: Event): void {
    const select = $event.currentTarget as HTMLSelectElement;
    this.diary.size = Number(select.value);
    this.selectedEntry = null;
    this.fetchEntries();
  }

  entryClick($event: Event, entry: Entry): void {
    const eventTarget = $event.target as HTMLInputElement;
    
    if (this.selectedEntry?.id === entry.id) {
      eventTarget.checked = false;
      this.selectedEntry = null;
      return;
    }
    this.selectedEntry = entry;
  }

  deleteEntry(): void {
    if (this.selectedEntry) {
      this.diary.deleteEntry(this.selectedEntry.id as number);
      this.selectedEntry = null;
      this.fetchEntries();
      this.numberOfPages = this.diary.getNumberOfPages();
    }
  }

  toggleGraph(): void {
    const isTable = this.diaryType === 'table';
    this.diaryType = isTable ? 'graph' : 'table';
    this.toggleButtonText = isTable ? 'Záznamy' : 'Graf';
  }
}
