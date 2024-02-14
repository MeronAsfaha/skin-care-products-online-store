import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from '../../user-data.service';
import { User } from '../../user.service';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  #userForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userDataService: UserDataService,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.#userForm = this.formBuilder.group({
      _id: '',
      name: '',
      username: '',
      password: '',
    });
  }

  get userForm() {
    return this.#userForm;
  }

  login() {
    const userCredentials = this.#userForm.value as User;
    this.userDataService.login(userCredentials).subscribe({
      next: (data: any) => {
        console.log(data);
        this.authService.token = data.accessToken;
        this.authService.decodeToken();
        location.pathname= '/';
      },
    });
  }
}
