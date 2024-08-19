import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { CommonModule } from '@angular/common';
import { validateEmail } from '../shared/utils/validator';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  @ViewChild('closeSignInModalBtn', { static: true }) closeSignInModalBtn: ElementRef<HTMLElement>; 
  @ViewChild('closeSignUpModalBtn', { static: true }) closeSignUpModalBtn: ElementRef<HTMLElement>; 

  localUser = {
    firstName: '',
    lastName: '',
    password: 'aaaaa',
    email: 'aaa@aaa.com',
  };

  public signUpFormValidated = false;
  public signInFormValidated = false;

  constructor(
    private userService:UserService,
  ) {}


ngOnInit() {}

  signUp = () => {
    this.userService.signUp(this.localUser).subscribe(() => {
      let el: HTMLElement = this.closeSignUpModalBtn.nativeElement;
      el.click();
    })
  };

  signIn = () => {
    this.userService.signIn(this.localUser).subscribe(() => {
      let el: HTMLElement = this.closeSignInModalBtn.nativeElement;
      el.click();
    })
  };


  public validateSignUpForm = () => {
    if (validateEmail(this.localUser?.email) && this.localUser.firstName 
      && this.localUser.lastName && this.localUser.password) {
      this.signUpFormValidated = true;
    } else {
      this.signUpFormValidated = false;
    }
  }

  public validateSignInForm = () => {
    if (validateEmail(this.localUser?.email) && this.localUser.password) {
      this.signInFormValidated = true;
    } else {
      this.signInFormValidated = false;
    }
  }
}
