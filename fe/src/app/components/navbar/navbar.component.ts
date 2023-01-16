import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogType } from 'src/app/enums/dialog-type';
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
  nicknameInitial?: string;
  theme?: Theme;
  dialogType?: DialogType;

  constructor(
    private readonly router: Router,
    private readonly themeService: ThemeService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.theme = this.themeService.getTheme();
    this.userService.refreshUser();
    this.user$ = this.userService.getCurrentUser();
    this.user$.subscribe((user) => (this.nicknameInitial = user?.username?.charAt(0)));
  }

  isActive(routerLink: string): boolean {
    return this.router.isActive(routerLink, true);
  }

  loginClick(): void {
    this.dialogType = DialogType.LOGIN;
  }

  registerClick(): void {
    this.dialogType = DialogType.REGISTER;
  }

  logoutClick(): void {
    this.userService.clearUser();
    if (this.router.url === '/diary' || this.router.url === '/profile') {
      this.router.navigate(['/']);
    }
  }

  swapTheme(): void {
    this.themeService.swapTheme();
  }
}
