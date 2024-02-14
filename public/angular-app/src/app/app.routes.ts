import { Routes } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { ActiveIngredientComponent } from './active-ingredients/active-ingredient/active-ingredient.component';
import { AddActiveIngredientComponent } from './active-ingredients/add-active-ingredient/add-active-ingredient.component';
import { FullUpdateActiveIngredientComponent } from './active-ingredients/full-update-active-ingredient/full-update-active-ingredient.component';
import { PartialUpdateActiveIngredientComponent } from './active-ingredients/partial-update-active-ingredient/partial-update-active-ingredient.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HomeComponent } from './home/home.component';
import { AddSkincareProductComponent } from './skincare-products/add-skincare-product/add-skincare-product.component';
import { FullUpdateSkincareProductComponent } from './skincare-products/full-update-skincare-product/full-update-skincare-product.component';
import { PartialUpdateSkincareProductComponent } from './skincare-products/partial-update-skincare-product/partial-update-skincare-product.component';
import { SkincareProductComponent } from './skincare-products/skincare-product/skincare-product.component';
import { SkincareProductsComponent } from './skincare-products/skincare-products/skincare-products.component';

const routes: Routes = [
  {
    path: environment.homePath,
    component: HomeComponent,
  },
  {
    path: environment.skincareProducts,
    component: SkincareProductsComponent,
  },
  {
    path: environment.addNewSkincareProductPath,
    component: AddSkincareProductComponent,
  },
  {
    path: environment.getOneSkincareProductPath,
    component: SkincareProductComponent,
  },

  {
    path: environment.fullUpdateSkincareProductPath,
    component: FullUpdateSkincareProductComponent,
  },
  {
    path: environment.partialUpdateSkincareProductPath,
    component: PartialUpdateSkincareProductComponent,
  },
  {
    path: environment.addActiveIngredientPath,
    component: AddActiveIngredientComponent,
  },
  {
    path: environment.getActiveIngredientPath,
    component: ActiveIngredientComponent,
  },
  {
    path: environment.fullUpdateActiveIngredientPath,
    component: FullUpdateActiveIngredientComponent,
  },
  {
    path: environment.partialUpdateActiveIngredientsPath,
    component: PartialUpdateActiveIngredientComponent,
  },

  {
    path: environment.registerPath,
    component: RegisterComponent,
  },
  {
    path: environment.loginPath,
    component: LoginComponent,
  },
];
export default routes;
