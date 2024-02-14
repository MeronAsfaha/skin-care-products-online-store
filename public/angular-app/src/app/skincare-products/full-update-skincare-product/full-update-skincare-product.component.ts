import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SkincareProduct } from '../../skincare-product.service';
import { SkincareProductsDataService } from '../../skincare-products-data.service';

@Component({
  selector: 'app-full-update-skincare-product',
  templateUrl: './full-update-skincare-product.component.html',
  styleUrls: ['./full-update-skincare-product.component.css'],
})
export class FullUpdateSkincareProductComponent implements OnInit {
  #skincareProductForm!: FormGroup;
  constructor(
    private skincareProductsService: SkincareProductsDataService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getId() {
    return this.route.snapshot.params['skincareId'];
  }

  get skincareProductForm() {
    return this.#skincareProductForm;
  }

  ngOnInit(): void {
    this.#skincareProductForm = this.formBuilder.group({
      name: '',
      manufacturer: '',
      skinType: '',
      activeIngredients: [],
    });
    const id = this.getId();
    this.skincareProductsService.getOneSkincareProduct(id).subscribe({
      next: (data) => this.fillForm(data),
    });
  }

  fillForm(data: SkincareProduct) {
    this.#skincareProductForm.setValue({
      name: data.name.toString(),
      manufacturer: data.manufacturer.toString(),
      skinType: data.skinType.toString(),
      activeIngredients: data.activeIngredients,
    });
  }

  onUpdate() {
    const id = this.getId();
    const product = this.#skincareProductForm.value as SkincareProduct;

    this.skincareProductsService
      .fullUpdateSkincareProduct(id, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['skincareProducts']);
        },
      });
  }
}
