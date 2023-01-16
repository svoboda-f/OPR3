import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    public localStorage: LocalStorageService,
    private readonly router: Router
  ) {}

  canActivate(): boolean {
    if (!this.localStorage.getToken()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
