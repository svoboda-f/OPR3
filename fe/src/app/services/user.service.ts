import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../models/user-info';
import { LocalStorageService } from './local-storage.service';

const SERVER_URL = environment.serverUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly currentUser: ReplaySubject<UserInfo> =
    new ReplaySubject<UserInfo>(1);

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  headers = { 'access-control-allow-origin': 'http://localhost:4200/' };

  refreshUser(): void {
    this.http
      .get<UserInfo>(`${SERVER_URL}/user-info`, { headers: this.headers })
      .subscribe({
        next: (user) => {
          this.currentUser.next(user);
        },
        error: (error) => {
          this.clearUser();
          if (this.router.url === '/diary' || this.router.url === '/profile') {
            this.router.navigate(['/']);
          }
        },
      });
  }

  clearUser(): void {
    //@ts-ignore
    this.currentUser.next();
    this.localStorageService.signOut();
  }

  getCurrentUser(): Observable<UserInfo> {
    return this.currentUser;
  }
}
