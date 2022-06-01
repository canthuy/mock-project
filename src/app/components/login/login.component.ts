import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

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
    this.spinner.show();
    this.authService.login(this.loginForm.value).subscribe((val) => {
      this.spinner.hide();
      if (this.authService.isLogin) {
        this.router.navigate(['/admin/home']);
        this.showSuccess();
      } else {
        console.log(val);
      }
    });
  }

  private showSuccess() {
    this.toastr.success('Success', '', {
      timeOut: 5000,
    });
  }

  // Demo accc
  public demoAccount() {
    this.loginForm.setValue({ email: 'thuy@gmail.com', password: '123456' });
  }
}
