import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.service';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  #url = environment.baseUrl;
  constructor(
    private _httpClient: HttpClient,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  public register(user: User): any {
    return this._httpClient.post<String>(this.#url + '/users', user);
  }

  public login(user: User): any {
    return this._httpClient.post<{ accessToken: string }>(
      this.#url + '/users/login',
      user
    );
  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
