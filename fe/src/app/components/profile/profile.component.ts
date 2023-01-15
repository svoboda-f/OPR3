import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/models/user-info';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  user?: UserInfo;
  sex?: string;

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.userService.refreshUser();
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.sex = this.user.sex.toString() === 'male' ? 'muž' : 'žena'; 
    });
  }

}
