import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveIngredient } from 'src/app/active-ingredient.service';
import { ActiveIngredientsDataService } from 'src/app/active-ingredients-data.service';

@Component({
  selector: 'app-partial-update-active-ingredient',
  templateUrl: './partial-update-active-ingredient.component.html',
  styleUrls: ['./partial-update-active-ingredient.component.css'],
})
export class PartialUpdateActiveIngredientComponent implements OnInit {
  activeIngredient: ActiveIngredient = new ActiveIngredient('', '', '', '');

  constructor(
    private activeIngredientsService: ActiveIngredientsDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activeIngredientsService
      .getOneActiveIngredients(
        this.getSkincareId(),
        this.getActiveIngredientId()
      )
      .subscribe({
        next: (data) => (this.activeIngredient = data),
      });
  }

  getSkincareId() {
    return this.route.snapshot.params['skincareId'];
  }

  getActiveIngredientId() {
    return this.route.snapshot.params['activeIngredientId'];
  }

  onSave() {
    const skincareId = this.getSkincareId();
    const activeIngredientId = this.getActiveIngredientId();
    let activeIngredientUpdates;

    if (
      this.activeIngredient.ingredientType &&
      this.activeIngredient.benefits
    ) {
      activeIngredientUpdates = {
        ingredientType: this.activeIngredient.ingredientType,
        benefits: this.activeIngredient.benefits,
      };
    } else if (this.activeIngredient.benefits) {
      activeIngredientUpdates = {
        benefits: this.activeIngredient.benefits,
      };
    } else if (this.activeIngredient.ingredientType) {
      activeIngredientUpdates = {
        ingredientType: this.activeIngredient.ingredientType,
      };
    }

    this.activeIngredientsService
      .partialUpdateActiveIngredient(
        skincareId,
        activeIngredientId,
        activeIngredientUpdates
      )
      .subscribe({
        next: (data) => {
          this.activeIngredient = data;
          this.router.navigate([
            'skincareProducts',
            skincareId,
            'activeIngredients',
            activeIngredientId,
          ]);
        },
      });
  }
}
