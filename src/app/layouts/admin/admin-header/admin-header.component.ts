import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent implements OnInit {
  public show = false;
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  public onToggle() {
    this.show = !this.show;
  }

  public onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.show = false;
  }
}
