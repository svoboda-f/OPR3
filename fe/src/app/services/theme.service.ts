import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Theme } from '../enums/theme';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme: Theme;
  constructor(
    private readonly localStorage: LocalStorageService,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    this.theme = this.localStorage.getTheme();
    this.setThemeToBody();
  }
  
  setThemeToBody() {
    this.document.body.setAttribute('data-theme', this.theme);
  }

  getTheme(): Theme {
    return this.theme;
  }

  swapTheme(): void {
    this.theme = this.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    this.setThemeToBody();
    this.localStorage.setTheme(this.theme);
  }
}
