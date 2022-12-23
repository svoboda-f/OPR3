import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  constructor(private readonly http: HttpClient) { }

  newEntry(entry: any): Observable<any> {
    return of("");
  }

  updateEntry(entry: any): Observable<any> {
    return of("");
  }

  deleteEntry(entry: any): Observable<any> {
    return of("");
  }

  getEntries(offset: number, limit: number): Observable<any[]> {
    return of([]);
  }

  getEntriesBetween(from: Date, to: Date): Observable<any[]> {
    return of([]);
  }

}
