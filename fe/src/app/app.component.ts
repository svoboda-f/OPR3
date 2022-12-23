import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  template:
    '<app-navbar></app-navbar><router-outlet></router-outlet><app-auth-dialog></app-auth-dialog>',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'fe';

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    const theme = this.localStorageService.getTheme();
    this.document.body.setAttribute('data-theme', theme);
  }
}
