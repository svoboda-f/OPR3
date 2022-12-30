import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  template:
    '<app-navbar></app-navbar><router-outlet></router-outlet>',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'fe';

  constructor() {}

  ngOnInit(): void {}
}
