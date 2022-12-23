import { Injectable } from '@angular/core';
import { Theme } from '../enums/theme';
import { CalculatorEntry } from '../models/calculator-entry';

const THEME = 'theme';
const CALCULATOR_ENTRIES = 'calculator-entries';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getTheme(): string {
    const theme = localStorage.getItem(THEME);
    //@ts-ignore
    if (theme !== Theme.DARK || theme !== Theme.LIGHT || !theme) {
      this.setTheme(Theme.LIGHT);
      return Theme.LIGHT;
    }
    return theme;
  }

  setTheme(theme: Theme): void {
    localStorage.setItem(THEME, theme);
  }

  getCalculatorEntries(): CalculatorEntry[] {
    const entries = localStorage.getItem(CALCULATOR_ENTRIES);
    if (!entries) {
      return [];
    }
    return JSON.parse(entries);
  }

  saveCalculatorEntries(entries: CalculatorEntry[]): void {
    localStorage.setItem(CALCULATOR_ENTRIES, JSON.stringify(entries));
  }

  deleteCalculatorEntries(): void {
    localStorage.removeItem(CALCULATOR_ENTRIES);
  }

  saveToken(token: any) {
    throw new Error('Method not implemented.');
  }

  signOut() {
    throw new Error('Method not implemented.');
  }
}
