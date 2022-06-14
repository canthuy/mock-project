import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { CanComponentDeactivate } from 'src/app/models/canDeactivate';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss'],
})
export class AdminProfileComponent implements OnInit, CanComponentDeactivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  public profileForm = new FormGroup({
    name: new FormControl(this.authService.user.name),
    email: new FormControl(this.authService.user.email),
    location: new FormControl(this.authService.user.location),
  });

  canExit = () => {
    const currentUser = {
      name: this.authService.user.name,
      email: this.authService.user.email,
      location: this.authService.user.location,
    };
    if (
      JSON.stringify(currentUser) !== JSON.stringify(this.profileForm.value)
    ) {
      let result = confirm(
        "You haven't saved your editing yet, are you sure to navigate away?"
      );
      return result;
    }
    return true;
  };

  //getter
  get name() {
    return this.profileForm.get('name');
  }
  get email() {
    return this.profileForm.get('email');
  }
  get location() {
    return this.profileForm.get('location');
  }

  public onCancel() {
    this.name.setValue(this.authService.user.name);
    this.location.setValue(this.authService.user.location);
  }

  public onSave() {
    if (
      JSON.stringify(this.authService.user) !==
      JSON.stringify(this.profileForm.value)
    ) {
      this.spinner.show();
      this.authService.updateProfile(this.profileForm.value).subscribe(
        (res) => {
          this.spinner.hide();
          this.toastr.success('Edit profile successfully', '', {
            timeOut: 5000,
            toastClass: 'ngx-toastr mt-2 toast-success',
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
  }
}
