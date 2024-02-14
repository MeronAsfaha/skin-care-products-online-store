import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveIngredient } from '../../active-ingredient.service';
import { ActiveIngredientsDataService } from '../../active-ingredients-data.service';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-active-ingredient',
  templateUrl: './active-ingredient.component.html',
  styleUrls: ['./active-ingredient.component.css'],
})
export class ActiveIngredientComponent implements OnInit {
  activeIngredient = new ActiveIngredient('', '', '', '');
  #skincareId!: string;

  get skincareId() {
    return this.#skincareId;
  }

  getSkincareId() {
    return this.route.snapshot.params['skincareId'];
  }

  getActiveIngredientId() {
    return this.route.snapshot.params['activeIngredientId'];
  }

  constructor(
    private activeIngeredientsService: ActiveIngredientsDataService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.#skincareId = this.getSkincareId();
    const activeIngredientId = this.getActiveIngredientId();
    this.activeIngeredientsService
      .getOneActiveIngredients(this.#skincareId, activeIngredientId)
      .subscribe({
        next: (data) => (this.activeIngredient = data),
        error: (err) => console.log(err),
      });
  }
  onDelete() {
    if (this.authService.token) {
      const skincareId = this.getSkincareId();
      const activeIngredientId = this.getActiveIngredientId();
      this.activeIngeredientsService
        .deleteActiveIngredient(skincareId, activeIngredientId)
        .subscribe({
          next: (data) => {
            this.router.navigate(['skincareProducts', skincareId]);
          },
        });
    } else {
      this.router.navigate(['login']);
    }
  }
}
