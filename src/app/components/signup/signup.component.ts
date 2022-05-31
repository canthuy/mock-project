import { User, AuthResponse } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public confirm: boolean = true;

  public signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('.{6,}'),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.confirmPassword.valueChanges.subscribe((value) => {
      this.confirm = true;
    });
  }

  // getter
  get name() {
    return this.signupForm.get('name');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  // Signup
  public signup() {
    const user: User = {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      location: 'Viet Nam',
    };
    this.authService.signup(user).subscribe((res: AuthResponse) => {
      console.log(res);
      let { email, password } = res.user;
      this.authService.login({ email, password }).subscribe((val) => {
        if (this.authService.isLogin()) {
          this.router.navigate(['/admin/home']);
        } else {
          console.log(val);
        }
      });
    });
  }

  // check confirm password
  public checkPassword() {
    if (this.confirmPassword.value === this.password.value) {
      this.confirm = true;
    } else this.confirm = false;
  }

  // check form invalid
  public isInvalidForm(): boolean {
    if (this.signupForm.invalid || !this.confirm) return true;
    return false;
  }
}
