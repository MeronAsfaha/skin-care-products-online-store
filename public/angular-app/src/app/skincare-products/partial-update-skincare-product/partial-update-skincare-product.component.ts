import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SkincareProduct } from '../../skincare-product.service';
import { SkincareProductsDataService } from '../../skincare-products-data.service';

@Component({
  selector: 'app-partial-update-skincare-product',
  templateUrl: './partial-update-skincare-product.component.html',
  styleUrls: ['./partial-update-skincare-product.component.css'],
})
export class PartialUpdateSkincareProductComponent {
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
      manufacturer: '',
      skinType: '',
    });
    const id = this.getId();
    this.skincareProductsService.getOneSkincareProduct(id).subscribe({
      next: (data) => this.fillForm(data),
    });
  }

  fillForm(data: SkincareProduct) {
    this.#skincareProductForm.setValue({
      manufacturer: data.manufacturer.toString(),
      skinType: data.skinType.toString(),
    });
  }

  onUpdate() {
    const id = this.getId();
    const product = this.#skincareProductForm.value as SkincareProduct;

    this.skincareProductsService
      .partialUpdateSkincareProduct(id, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['skincareProducts']);
        },
      });
  }
}
