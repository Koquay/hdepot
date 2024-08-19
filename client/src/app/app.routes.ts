import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SelectedProductComponent } from './product/selected-product/selected-product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { Checkout2Component } from './checkout2/checkout2.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'selectedProduct/:productId', component: SelectedProductComponent },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: Checkout2Component},
    
    // { path: 'customizer/:productId', component: CustomizerComponent },
      {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'home'
      },
];
