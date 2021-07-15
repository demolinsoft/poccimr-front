import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authSubscription: Subscription;
  loginForm = this.fb.group({
    username: [''],
    password: [''],
    rememberMe: [false]
  });
  authenticationError = false;
  status = true;
  slideIndex = 0;
  racine = '../../assets/images/';
  visibilityIcon = this.racine + 'visibility_off.svg';
  passwordType = 'password';

  constructor(
    private router: Router,
    // private accountService: AccountService,
    private loginService: LoginService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.showSlides();
    this.visibilityIcon = this.racine + 'visibility_off.svg';
    this.loginService.isAuth = false;
  }
  login(): void {
    if(this.loginService
      .login({
        username: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value,
      })){
        this.authenticationError = false;
        this.loginService.isAuth = true;
        this.router.navigate(['/accueil']);
      } else{
        this.loginService.isAuth = false;
        this.authenticationError = true;
      }
      
  }

  register(): void {
    this.router.navigate(['/account/register']);
  }
  requestResetPassword(): void {
    this.router.navigate(['/account/reset', 'request']);
  }

  showSlides(): void {
    let i;
    const slides = document.getElementsByClassName('mySlides') as HTMLCollectionOf<HTMLElement>;
    const dots = document.getElementsByClassName('dot');
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    this.slideIndex++;
    if (this.slideIndex > slides.length) {
      this.slideIndex = 1;
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i]!.className.replace('active', '');
    }
    slides[this.slideIndex - 1]!.style.display = 'block';
    dots[this.slideIndex - 1]!.classList.add('ative');
    setTimeout(() => {
      this.showSlides();
    }, 2000); // Change image every 2 seconds

  }

  addCSS(): string {
    if (this.authenticationError === true) {
      return 'inputError';
    } else if (this.loginForm.get('username').value) {
      return 'focusInput';
    } else {
      return 'input';
    }
  }

  addCSSpass(): string {
    if (this.authenticationError === true) {
      return 'inputError';
    } else if (this.loginForm.get('password').value) {
      return 'focusInput';
    } else {
      return 'input';
    }
  }

  addButton(): string {
    if (this.loginForm.get('username').value && this.loginForm.get('password').value) {
      this.status = false;
      return 'button-yellow';
    } else {
      this.status = true;
      return 'button-defaut';
    }
  }
  showPassword(): void {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.visibilityIcon = this.racine + 'visibility.svg';
    } else {
      this.passwordType = 'password';
      this.visibilityIcon = this.racine + 'visibility_off.svg';
    }
  }
}
