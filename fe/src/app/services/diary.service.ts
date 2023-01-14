import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entry } from '../models/entry';
import { ServerResponse } from '../models/server-response';
import { CalculatorService } from './calculator.service';
import { UserService } from './user.service';

const SERVER_URL = environment.serverUrl;

@Injectable({
  providedIn: 'root',
})
export class DiaryService {
  private entries: BehaviorSubject<Entry[]> = new BehaviorSubject<Entry[]>([]);
  private numberOfPages: number | null = null;

  offset: number = 0;
  sizes: number[] = [5,10,20];
  size: number = this.sizes[0];
  field: string = 'date';
  direction: string = 'desc';


  constructor(
    private readonly http: HttpClient,
    private readonly calculator: CalculatorService,
    private readonly userService: UserService
  ) {}

  newEntry(entry: Entry): void {
    this.http.post<Entry>(`${SERVER_URL}/entries`, entry).subscribe({
      next: (response) => {
        this.entries.subscribe((entries) => entries.push(response));
      },
    });
  }

  updateEntry(entry: Entry): Observable<Entry> {
    return this.http.patch<Entry>(`${SERVER_URL}/entries`, entry);
  }

  deleteEntry(entryId: number): void {
    this.http
      .request('delete', `${SERVER_URL}/entries`, { body: entryId })
      .subscribe({
        next: (resposnse) => {
          this.entries.next(
            this.entries.getValue().filter((entry) => entry.id !== entryId)
          );
        },
      });
  }

  fetchEntries(
  ): void {
    this.http
      .get<ServerResponse>(
        `${SERVER_URL}/entries?offset=${this.offset}&size=${this.size}&field=${this.field}&direction=${this.direction}`
      )
      .subscribe({
        next: (response) => {
          this.numberOfPages = response.numberOfPages;
          this.entries.next(response.entries);
        },
      });
  }

  fetchEntriesBetween(from: Date, to: Date): Observable<Entry[]> {
    return this.http.get<Entry[]>(
      `${SERVER_URL}/entries/between?from=${from}&to=${to}`
    );
  }

  getEntries(): Observable<Entry[]> {
    return this.entries.asObservable();
  }

  getNumberOfPages(): number | null {
    return this.numberOfPages;
  }
}
