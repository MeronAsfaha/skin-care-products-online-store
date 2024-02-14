import { Injectable } from '@angular/core';
import { JwtConfig } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  #token: String = '';
  #name: String = '';
  #loggedIn: Boolean = false;

  constructor() {}

  get token(): String {
    return localStorage.getItem('php-token') || '';
  }

  set token(token: String) {
    localStorage.setItem('php-token', token.toString());
  }

  get name(): String {
    return localStorage.getItem('php-name') || '';
  }

  set name(name: String) {
    localStorage.setItem('php-name', name.toString());
  }

  decodeToken(): void {
    const token = this.token.split('.')[1];
    const decodedToken = JSON.parse(atob(token));
    this.name = decodedToken.sub;
  }

  get loggedIn(): Boolean {
    return this.#loggedIn;
  }

  set loggedIn(loggedIn: Boolean) {
    this.#loggedIn = loggedIn;
  }

  logout(): void {
    this.#loggedIn = false;
    this.#token = '';
    this.#name = '';
    localStorage.removeItem('php-token');
    localStorage.removeItem('php-name');
    location.pathname = '/login';
  }
}
