import { Component, OnInit } from '@angular/core';
import { IsActiveMatchOptions, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  user$: Observable<boolean> = of(true);

  constructor(private readonly router: Router) { 
  }


  ngOnInit(): void {
  }

  isActive(routerLink: string): boolean {
    return this.router.isActive(routerLink,true);
  }

  logoutClick(): void {
    this.user$ = of(false);
  }
}
