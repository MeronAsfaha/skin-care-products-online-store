import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActiveIngredient } from './active-ingredient.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ActiveIngredientsDataService {
  #baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getActiveIngredients(skincareId: String): Observable<ActiveIngredient[]> {
    return this.http.get<ActiveIngredient[]>(
      this.#baseUrl + 'skincareProducts/' + skincareId + '/activeIngredients'
    );
  }

  getOneActiveIngredients(
    skincareId: String,
    activeIngredientId: String
  ): Observable<ActiveIngredient> {
    return this.http.get<ActiveIngredient>(
      this.#baseUrl +
        'skincareProducts/' +
        skincareId +
        '/activeIngredients/' +
        activeIngredientId
    );
  }

  addOneActiveIngredient(
    skincareId: String,
    activeIngredient: ActiveIngredient
  ): Observable<ActiveIngredient> {
    return this.http.post<ActiveIngredient>(
      this.#baseUrl + 'skincareProducts/' + skincareId + '/activeIngredients',
      activeIngredient
    );
  }

  fullUpdateActiveIngredient(
    skincareId: String,
    activeIngredientId: String,
    activeIngredient: ActiveIngredient
  ): Observable<ActiveIngredient> {
    return this.http.put<ActiveIngredient>(
      this.#baseUrl +
        'skincareProducts/' +
        skincareId +
        '/activeIngredients/' +
        activeIngredientId,
      activeIngredient
    );
  }

  partialUpdateActiveIngredient(
    skincareId: String,
    activeIngredientId: String,
    activeIngredient: unknown
  ): Observable<ActiveIngredient> {
    return this.http.patch<ActiveIngredient>(
      this.#baseUrl +
        'skincareProducts/' +
        skincareId +
        '/activeIngredients/' +
        activeIngredientId,
      activeIngredient
    );
  }

  deleteActiveIngredient(
    skincareId: String,
    activeIngredientId: String
  ): Observable<String> {
    return this.http.delete<String>(
      this.#baseUrl +
        'skincareProducts/' +
        skincareId +
        '/activeIngredients/' +
        activeIngredientId
    );
  }
}
