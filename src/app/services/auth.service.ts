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
  public isLogin: boolean = false;

  constructor(private http: HttpClient) {
    let token = localStorage.getItem(this.TOKEN_NAME);
    if (token) {
      this.TOKEN = token;
      this.user = JSON.parse(localStorage.getItem('user'));
      this.isLogin = true;
    }
  }

  public login({ email, password }) {
    this.isLogin = true;
    return this.http
      .post(this.BASE_URL + '/auth/login', { email, password })
      .pipe(
        tap((res: AuthResponse) => {
          this.TOKEN = res.token;
          this.user = res.user;
          let saveUser = {
            name: this.user.name,
            email: this.user.email,
            location: this.user.location,
          };
          localStorage.setItem(this.TOKEN_NAME, this.TOKEN);
          localStorage.setItem('user', JSON.stringify(saveUser));
        })
      );
  }

  public signup(user: User) {
    return this.http.post(this.BASE_URL + '/auth/register', user);
  }
  // public isLogin(): boolean {
  //   return !!this.user;
  // }

  public logout() {
    this.isLogin = false;
    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem('user');
  }

  public updateProfile(user: User) {
    user.lastName = 'lastname';
    console.log(user);

    return this.http.patch(`${this.BASE_URL}/auth/updateUser`, user).pipe(
      tap((res: any) => {
        const saveUser = {
          name: res.user.name,
          email: res.user.email,
          location: res.user.location,
        };
        localStorage.setItem('user', JSON.stringify(saveUser));
        this.user = saveUser;
      })
    );
  }
}
