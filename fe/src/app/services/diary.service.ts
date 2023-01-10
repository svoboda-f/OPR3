import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entry } from '../models/entry';
import { ServerResponse } from '../models/server-response';

const SERVER_URL = environment.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class DiaryService {


  constructor(private readonly http: HttpClient) { }

  newEntry(entry: Entry): Observable<Entry> {
    return this.http.post<Entry>(`${SERVER_URL}/entries`, entry);
  }

  updateEntry(entry: Entry): Observable<Entry> {
    return this.http.patch<Entry>(`${SERVER_URL}/entries`, entry);
  }

  deleteEntry(entry: Entry): void {
    this.http.request('delete', `${SERVER_URL}/entries`, {body: entry}) 
    // this.http.delete<Entry>(`${SERVER_URL}/entries`, entry);
  }

  getEntries(offset: number, size: number, field: string, direction: string): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${SERVER_URL}/entries?offset=${offset}&size=${size}&field=${field}&direction=${direction}`);
  }

  getEntriesBetween(from: Date, to: Date): Observable<Entry[]> {
    return this.http.get<Entry[]>(`${SERVER_URL}/entries/between?from=${from}&to=${to}`);
  }

}
