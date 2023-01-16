import { Injectable } from '@angular/core';
import { Theme } from '../enums/theme';
import { CalculatorEntry } from '../models/calculator-entry';

const THEME = 'theme';
const CALCULATOR_ENTRIES = 'calculator-entries';
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  
  constructor() {}

  getTheme(): Theme {
    const theme = localStorage.getItem(THEME);
    
    if ((theme !== Theme.DARK && theme !== Theme.LIGHT) || !theme) {
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

  saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken() : string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  signOut(): void{
    localStorage.removeItem(TOKEN_KEY);
  }
}
