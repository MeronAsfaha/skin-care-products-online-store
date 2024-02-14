import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SkincareProduct } from './skincare-product.service';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SkincareProductsDataService {
  #baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  getSkincareProducts(offset: number): Observable<SkincareProduct[]> {
    return this.http.get<SkincareProduct[]>(
      this.#baseUrl + '/skincareProducts/?offset=' + offset
    );
  }

  getOneSkincareProduct(skincareId: String): Observable<SkincareProduct> {
    return this.http.get<SkincareProduct>(
      this.#baseUrl + '/skincareProducts/' + skincareId
    );
  }

  createSkincareProduct(product: SkincareProduct): Observable<SkincareProduct> {
    return this.http.post<SkincareProduct>(
      this.#baseUrl + '/skincareProducts',
      product
    );
  }

  deleteSkincareProduct(skincareId: String): Observable<SkincareProduct> {
    return this.http.delete<SkincareProduct>(
      this.#baseUrl + '/skincareProducts/' + skincareId
    );
  }

  partialUpdateSkincareProduct(
    skincareId: String,
    product: SkincareProduct
  ): Observable<SkincareProduct> {
    return this.http.patch<SkincareProduct>(
      this.#baseUrl + '/skincareProducts/' + skincareId,
      product
    );
  }

  fullUpdateSkincareProduct(
    skincareId: String,
    product: SkincareProduct
  ): Observable<SkincareProduct> {
    return this.http.put<SkincareProduct>(
      this.#baseUrl + '/skincareProducts/' + skincareId,
      product
    );
  }
}
