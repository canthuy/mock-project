import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss'],
})
export class AdminProfileComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  public profileForm = new FormGroup({
    name: new FormControl(this.authService),
    lastName: new FormControl(this.authService),
    email: new FormControl(this.authService),
    city: new FormControl(this.authService),
  });

  //getter
  get name() {
    return this.profileForm.get('name');
  }
  get last_name() {
    return this.profileForm.get('last_name');
  }
  get email() {
    return this.profileForm.get('email');
  }
  get city() {
    return this.profileForm.get('city');
  }
}
