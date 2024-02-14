import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  #isAuthenticated = false;
  #user = '';
  constructor(private AuthService: AuthenticationService) {}

  get isAuthenticated() {
    return this.#isAuthenticated;
  }

  set isAuthenticated(value) {
    this.#isAuthenticated = value;
  }

  get user() {
    return this.#user;
  }

  set user(value) {
    this.#user = value;
  }

  ngOnInit(): void {
    this.isAuthenticated = this.AuthService.token ? true : false;
    this.#user = this.AuthService.name.toString();
  }

  logout() {
    this.AuthService.logout();
    this.isAuthenticated = false;
  }
}
