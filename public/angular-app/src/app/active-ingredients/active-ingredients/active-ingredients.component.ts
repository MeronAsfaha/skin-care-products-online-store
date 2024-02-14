import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveIngredient } from '../../active-ingredient.service';
import { ActiveIngredientsDataService } from '../../active-ingredients-data.service';

@Component({
  selector: 'app-active-ingredients',
  templateUrl: './active-ingredients.component.html',
  styleUrls: ['./active-ingredients.component.css'],
})
export class ActiveIngredientsComponent implements OnInit {
  activeIngredients: ActiveIngredient[] = [];
  #skincareId!: String;

  get skincareId(): String {
    return this.#skincareId;
  }

  getId(): String {
    return this.route.snapshot.params['skincareId'];
  }
  constructor(
    private activeIngredientsService: ActiveIngredientsDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.#skincareId = this.getId();
    this.activeIngredientsService
      .getActiveIngredients(this.#skincareId)
      .subscribe({
        next: (data) => (this.activeIngredients = data),
      });
  }
}
