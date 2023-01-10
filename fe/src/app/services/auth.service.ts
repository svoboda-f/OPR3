import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../models/user-info';
import { LocalStorageService } from './local-storage.service';
import { UserService } from './user.service';

const SERVER_URL = environment.serverUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly localStorageService: LocalStorageService,
    private readonly userService: UserService
  ) {}

  register(username: string, password: string, userInfo: UserInfo): Observable<any> {
    return this.http.post(`${SERVER_URL}/user/register`, {username, password, userInfo});
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(
        `${SERVER_URL}/user/login`,
        { username, password },
        httpOptions
      )
      .pipe(
        tap((response: any) => {
          if (response?.token) {
            this.localStorageService.saveToken(response.token);
          }
        })
      );
  }

  logout(): void {
    this.localStorageService.signOut();
    this.userService.clearUser();
  }
}
