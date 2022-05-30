import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  // getter formControl
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  // Login function
  public login(): void {
    this.authService.login(this.loginForm.value).subscribe((val) => {
      if(this.authService.isLogin()){
        this.router.navigate(['/admin/home'])
      }
      else {
      console.log(val);

      }
    });
  }

  // Demo accc
  public demoAccount() {
    this.loginForm.setValue({ email: 'thuy@gmail.com', password: '123456' });
  }
}
