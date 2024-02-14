import { Component, OnInit } from '@angular/core';
import { SkincareProduct } from '../../skincare-product.service';
import { SkincareProductsDataService } from '../../skincare-products-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-skincare-products',
  templateUrl: './skincare-products.component.html',
  styleUrls: ['./skincare-products.component.css'],
})
export class SkincareProductsComponent implements OnInit {
  skincareProducts: SkincareProduct[] = [];
  offset = 0;

  constructor(
    private skincareProductsService: SkincareProductsDataService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (data) => {
        if (data['offset']) {
          this.offset = data['offset'];
        }
      },
    });

    this.skincareProductsService.getSkincareProducts(this.offset).subscribe({
      next: (data) => (this.skincareProducts = data),
    });
  }
}
