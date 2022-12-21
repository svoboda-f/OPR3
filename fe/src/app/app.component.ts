import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template:
    '<app-navbar></app-navbar><router-outlet></router-outlet><app-auth-dialog></app-auth-dialog>',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'fe';

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  ngOnInit(): void {
    this.document.body.setAttribute('data-theme', 'light');
  }
}
