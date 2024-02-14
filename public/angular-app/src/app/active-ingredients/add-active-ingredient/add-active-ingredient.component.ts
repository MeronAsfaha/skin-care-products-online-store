import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveIngredient } from '../../active-ingredient.service';
import { ActiveIngredientsDataService } from '../../active-ingredients-data.service';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-add-active-ingredient',
  templateUrl: './add-active-ingredient.component.html',
  styleUrls: ['./add-active-ingredient.component.css'],
})
export class AddActiveIngredientComponent {
  skincareId!: string;
  #ingredientForm!: FormGroup;
  activeIngredient: ActiveIngredient = new ActiveIngredient('', '', '', '');

  get ingredientForm(): FormGroup {
    return this.#ingredientForm;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activeIngredientsService: ActiveIngredientsDataService,
    private authService: AuthenticationService
  ) {
    this.skincareId = this.getSkincareId();
    this.#ingredientForm = new FormGroup({
      name: new FormControl(''),
      ingredientType: new FormControl(''),
      benefits: new FormControl(''),
    });
  }

  getSkincareId() {
    return this.route.snapshot.params['skincareId'];
  }

  addIngredient(): void {
    if (this.authService.token) {
      const activeIngredient = this.#ingredientForm.value as ActiveIngredient;
      this.activeIngredientsService
        .addOneActiveIngredient(this.skincareId, activeIngredient)
        .subscribe({
          next: (data) =>
            this.router.navigate(['skincareProducts', this.skincareId]),
          error: (err) => console.log(err),
        });
    } else {
      this.router.navigate(['login']);
    }
  }
}
