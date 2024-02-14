import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { SkincareProductsDataService } from '../../skincare-products-data.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-add-skincare-product',
  templateUrl: './add-skincare-product.component.html',
  styleUrls: ['./add-skincare-product.component.css'],
})
export class AddSkincareProductComponent {
  #skincareForm!: FormGroup;
  #activeIngredientForm!: FormGroup;
  get skincareForm() {
    return this.#skincareForm;
  }
  get activeIngredientForm() {
    return this.#activeIngredientForm;
  }

  constructor(
    private skincareService: SkincareProductsDataService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.#skincareForm = this.formBuilder.group({
      name: '',
      manufacturer: '',
      skinType: '',
    });
  }

  addSkincare() {
    if (!this.authService.token) {
      this.router.navigate(['login']);
    } else {
      const data = this.skincareForm.value;
      this.skincareService.createSkincareProduct(data).subscribe({
        next: (data) => this.router.navigate(['skincareProducts', data._id]),
      });
    }
  }
}
