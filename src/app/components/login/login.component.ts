import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

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
  private returnUrl: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      this.returnUrl = res.returnUrl;
    });
  }

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
    this.authService.login(this.loginForm.value).subscribe(
      (val) => {
        this.spinner.hide();
        if (this.authService.isLogin) {
          if (this.returnUrl) {
            this.router.navigate([this.returnUrl]);
          } else this.router.navigate(['/admin/home']);
          this.showSuccess();
        }
      },
      (err) => {
        this.spinner.hide();
        this.authService.isLogin = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.msg,
        });
      }
    );
  }

  private showSuccess() {
    this.toastr.success(`Welcome Back ${this.authService.user.name} `, '', {
      timeOut: 5000,
      toastClass: 'ngx-toastr mt-2 toast-success',
    });
  }

  // Demo accc
  public demoAccount() {
    this.loginForm.setValue({ email: 'thuy@gmail.com', password: '123456' });
  }
}
