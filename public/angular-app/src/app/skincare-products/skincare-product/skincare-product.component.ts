import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SkincareProduct } from '../../skincare-product.service';
import { SkincareProductsDataService } from '../../skincare-products-data.service';
import { ActiveIngredient } from 'src/app/active-ingredient.service';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-skincare-product',
  templateUrl: './skincare-product.component.html',
  styleUrls: ['./skincare-product.component.css'],
})
export class SkincareProductComponent implements OnInit {
  skincareProduct: SkincareProduct = new SkincareProduct('', '', '', '', []);
  activeIngredientsVisible = false;

  constructor(
    private skincareProductsService: SkincareProductsDataService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  getId() {
    return this.route.snapshot.params['skincareId'];
  }

  ngOnInit(): void {
    const skincareId = this.getId();
    this.skincareProductsService.getOneSkincareProduct(skincareId).subscribe({
      next: (data) => (this.skincareProduct = data),
    });
  }

  OnDelete() {
    if (this.authService.token) {
      const skincareId = this.getId();
      this.skincareProductsService.deleteSkincareProduct(skincareId).subscribe({
        next: () => {
          console.log('deleted Successfully');
        },
      });
    } else {
      this.router.navigate(['login']);
    }
  }
  toggleActiveIngredients() {
    this.activeIngredientsVisible = !this.activeIngredientsVisible;
  }
}
