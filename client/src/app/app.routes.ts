import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    // { path: 'products/:id', component: ProductsComponent },
    // { path: 'customizer/:productId', component: CustomizerComponent },
      {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'home'
      },
];
