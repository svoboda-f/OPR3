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

  constructor(
    private readonly diary: DiaryService,
    private readonly authGuard: AuthGuardService,
    private readonly calculator: CalculatorService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    if (!this.authGuard.canActivate()) return;
    console.log('yes');

    this.userService
      .getCurrentUser()
      .subscribe((responese) => (this.user = responese));

    this.fetchEntries(this.offset, this.size, this.field, this.direction);
  }

  fetchEntries(
    offset: number,
    size: number,
    field: string,
    direction: string
  ): void {
    console.log(offset,size,field,direction);
    this.diary
      .getEntries(offset, size, field, direction)
      .subscribe((response) => {
        this.entries = response.entries;
        this.pages = [
          ...Array.from({ length: response.numberOfPages }, (_, i) => i + 1),
        ];
        console.log(response.numberOfPages);
        console.log(this.pages);
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

  pageButtonClick($event: Event): void {
    const btnClicked = $event.currentTarget as HTMLButtonElement;
    const btnClickedPageNumber = Number(btnClicked.innerText);
    
    if(this.currentPage === btnClickedPageNumber) {
      return;
    }

    this.currentPage = btnClickedPageNumber;

    this.fetchEntries(
      this.currentPage - 1,
      this.size,
      this.field,
      this.direction
    );
  }

  sizesValueChange($event: Event): void {
    const select = $event.currentTarget as HTMLSelectElement;
    this.size = Number(select.value);
    this.fetchEntries(
      this.currentPage - 1,
      this.size,
      this.field,
      this.direction
    );
  }
}
