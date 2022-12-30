import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Theme } from 'src/app/enums/theme';
import { UserInfo } from 'src/app/models/user-info';
import { ThemeService } from 'src/app/services/theme.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  user$?: Observable<UserInfo>;
  nicknameInitial: string = 'C';
  theme?: Theme;

  constructor(
    private readonly router: Router,
    private readonly themeService: ThemeService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.theme = this.themeService.getTheme();
    this.userService.refreshUser();
    this.user$ = this.userService.getCurrentUser();
  }

  isActive(routerLink: string): boolean {
    return this.router.isActive(routerLink, true);
  }

  logoutClick(): void {
    this.userService.clearUser();
  }

  swapTheme(): void {
    this.themeService.swapTheme();
  }

  dialogShouldRender(): Observable<boolean> {
    return of(true);
  }
}
