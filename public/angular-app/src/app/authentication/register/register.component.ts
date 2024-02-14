import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from '../../user-data.service';
import { User } from '../../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  #registrationForm!: FormGroup;

  get registrationForm() {
    return this.#registrationForm;
  }

  constructor(
    private userDataService: UserDataService,
    private router: Router
  ) {
    this.#registrationForm = new FormGroup({
      name: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      repeat_password: new FormControl(),
    });
  }
  register() {
    const user = this.#registrationForm.value as User;
    this.userDataService.register(user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
    });
  }
}
