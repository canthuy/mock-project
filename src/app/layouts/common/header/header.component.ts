import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public show: boolean = false;
  public isLogin: boolean;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLogin = this.authService.isLogin();
  }

  public onToggle() {
    this.show = !this.show;
  }

  public onLogout() {
    this.authService.logout();
    this.router.navigate(['/home']);
    this.show = false;
    this.isLogin = false;
  }
}
