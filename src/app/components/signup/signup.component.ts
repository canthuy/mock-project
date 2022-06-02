import { NgxSpinnerService } from 'ngx-spinner';
import { User, AuthResponse } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

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
    this.spinner.show();
    this.authService.signup(user).subscribe(
      (res: AuthResponse) => {
        console.log(res);
        this.spinner.hide();

        this.authService
          .login({ email: this.email.value, password: this.password.value })
          .subscribe((val) => {
            if (this.authService.isLogin) {
              this.router.navigate(['/admin/home']);
            } else {
              console.log(val);
            }
          });
      },
      (err) => {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.msg,
        });
      }
    );
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
