import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActiveIngredientComponent } from './active-ingredients/active-ingredient/active-ingredient.component';
import { ActiveIngredientsComponent } from './active-ingredients/active-ingredients/active-ingredients.component';
import { AddActiveIngredientComponent } from './active-ingredients/add-active-ingredient/add-active-ingredient.component';
import { FullUpdateActiveIngredientComponent } from './active-ingredients/full-update-active-ingredient/full-update-active-ingredient.component';
import { PartialUpdateActiveIngredientComponent } from './active-ingredients/partial-update-active-ingredient/partial-update-active-ingredient.component';
import { AppComponent } from './app.component';
import routes from './app.routes';
import { AuthenticationTokenInterceptor } from './authentication-token.interceptor';
import { AuthenticationService } from './authentication.service';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AddSkincareProductComponent } from './skincare-products/add-skincare-product/add-skincare-product.component';
import { FullUpdateSkincareProductComponent } from './skincare-products/full-update-skincare-product/full-update-skincare-product.component';
import { PartialUpdateSkincareProductComponent } from './skincare-products/partial-update-skincare-product/partial-update-skincare-product.component';
import { SkincareProductComponent } from './skincare-products/skincare-product/skincare-product.component';
import { SkincareProductsComponent } from './skincare-products/skincare-products/skincare-products.component';

function initApp(authService: AuthenticationService) {
  return () => {
    const token = localStorage.getItem('php-token');
    if (token) {
      authService.token = token;
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    SkincareProductComponent,
    SkincareProductsComponent,
    HomeComponent,
    NavigationComponent,
    AddSkincareProductComponent,
    FullUpdateSkincareProductComponent,
    RegisterComponent,
    LoginComponent,
    PartialUpdateSkincareProductComponent,
    ActiveIngredientComponent,
    ActiveIngredientsComponent,
    AddActiveIngredientComponent,
    FullUpdateActiveIngredientComponent,
    PartialUpdateActiveIngredientComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [AuthenticationService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
