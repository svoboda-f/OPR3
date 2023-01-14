import { Component, Input, OnInit } from '@angular/core';
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
  offset: number = 0;
  sizes: number[] = [5, 10, 20];
  size: number = this.sizes[0];
  field: string = 'date';
  direction: string = 'desc';

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
    console.log(this.selectedEntry);

    this.userService
      .getCurrentUser()
      .subscribe((responese) => (this.user = responese));
    this.fetchEntries();
    this.diary.getEntries().subscribe((entries) => {
      this.entries = entries;
      this.pages = [
        ...Array.from(
          { length: this.diary.getNumberOfPages()! },
          (_, i) => i + 1
        ),
      ];
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

  pageButtonClick($event: Event): void {
    const btnClicked = $event.currentTarget as HTMLButtonElement;
    const btnClickedPageNumber = Number(btnClicked.innerText);

    console.log(this.pages, this.currentPage);
    if (
      (this.currentPage === btnClickedPageNumber &&
        this.entries.length === this.size) ||
      (this.currentPage === this.pages![this.pages?.length! - 1] &&
        this.currentPage === btnClickedPageNumber)
    ) {
      return;
    }
    this.currentPage = btnClickedPageNumber;
    this.diary.offset = btnClickedPageNumber - 1;
    this.selectedEntry = null;
    this.fetchEntries();
  }

  sizesValueChange($event: Event): void {
    const select = $event.currentTarget as HTMLSelectElement;
    this.size = Number(select.value);
    this.selectedEntry = null;
    this.fetchEntries();
  }

  entryClick($event: Event, entry: Entry): void {
    const eventTarget = $event.target as HTMLInputElement;

    console.log(entry.id, this.selectedEntry);
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
    }
  }

  toggleGraph(): void {
    const isTable = this.diaryType === 'table';
    this.diaryType = isTable ? 'graph' : 'table';
    this.toggleButtonText = isTable ? 'Záznamy' : 'Graf';
  }
}
