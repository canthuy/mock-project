import { AuthResponse, User } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = 'https://jobify-prod.herokuapp.com/api/v1';
  private TOKEN_NAME = 'token';

  public TOKEN: string;
  public user: User;

  constructor(private http: HttpClient) {
    let token = localStorage.getItem(this.TOKEN_NAME);
    if (token) {
      this.TOKEN = token;
    }
  }

  public login({ email, password }) {
    return this.http
      .post(this.BASE_URL + '/auth/login', { email, password })
      .pipe(
        tap((res: AuthResponse) => {
          this.TOKEN = res.token;
          this.user = res.user;
          localStorage.setItem(this.TOKEN_NAME, this.TOKEN);
        })
      );
  }

  public signup(user: User) {
    return this.http.post(this.BASE_URL + '/auth/register', user);
  }
  public isLogin(): boolean {
    return !!this.user;
  }

  public logout() {
    localStorage.removeItem(this.TOKEN_NAME);
  }
}
