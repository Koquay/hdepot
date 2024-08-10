import { Component } from '@angular/core';
import { HomeHeroCarouselComponent } from './home-hero-carousel/home-hero-carousel.component';
import { TopPicksComponent } from "./top-picks/top-picks.component";
import { SavingsComponent } from './savings/savings.component';
import { DealsComponent } from './deals/deals.component';
import { ShopByCategoryComponent } from './shop-by-category/shop-by-category.component';
import { PopularCategoriesComponent } from './popular-categories/popular-categories.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeHeroCarouselComponent,
    TopPicksComponent,
    SavingsComponent,
    DealsComponent,
    ShopByCategoryComponent,
    PopularCategoriesComponent,
    
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(){}

  ngOnInit() {}


}
