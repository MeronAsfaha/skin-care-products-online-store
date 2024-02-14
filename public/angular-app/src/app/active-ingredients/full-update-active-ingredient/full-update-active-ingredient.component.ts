import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveIngredientsDataService } from '../../active-ingredients-data.service';
import { ActiveIngredient } from '../../active-ingredient.service';

@Component({
  selector: 'app-full-update-active-ingredient',
  templateUrl: './full-update-active-ingredient.component.html',
  styleUrls: ['./full-update-active-ingredient.component.css'],
})
export class FullUpdateActiveIngredientComponent implements OnInit {
  activeIngredient: ActiveIngredient = new ActiveIngredient('', '', '', '');

  constructor(
    private activeIngredientsService: ActiveIngredientsDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getSkincareId() {
    return this.route.snapshot.params['skincareId'];
  }
  getActiveIngredientId() {
    return this.route.snapshot.params['activeIngredientId'];
  }

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

  onSave() {
    const skincareId = this.getSkincareId();
    const activeIngredientId = this.getActiveIngredientId();
    const updatedActiveIngredient = this.activeIngredient;
    this.activeIngredientsService
      .fullUpdateActiveIngredient(
        skincareId,
        activeIngredientId,
        updatedActiveIngredient
      )
      .subscribe({
        next: (data) => {
          this.router.navigate([
            'skincareProducts/',
            skincareId,
            'activeIngredients',
            activeIngredientId,
          ]);
        },
      });
  }
}
