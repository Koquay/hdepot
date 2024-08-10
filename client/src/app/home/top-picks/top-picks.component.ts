import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { HomeService } from '../home.service';
import { ProductService } from '../../product/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ShortenAddEllipsisPipe } from '../../shared/pipes/shorten-add-ellipsis.pipe';
import { DiscountPricePipe } from '../../shared/pipes/discount-price';
import { RatingDirective } from '../../shared/directives/rating.directive';
import { TopPickDataComponent } from '../top-pick-data/top-pick-data.component';

@Component({
  selector: 'app-top-picks',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    ShortenAddEllipsisPipe,
    DiscountPricePipe,
    RatingDirective,
    TopPickDataComponent
  ],
  templateUrl: './top-picks.component.html',
  styleUrl: './top-picks.component.scss'
})
export class TopPicksComponent {
  public topPickTabs:any;
  public topPickProducts:any;
  public topPickType:any;

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 4,
      }
    }
  }

  constructor(
    private store: Store<{ homeReducers:any; productReducers:any}>,
    private productService:ProductService
  ){}

  ngOnInit() {
    this.topPickType = 'All'
    this.subscribeToReduxStores();    
  }

  private subscribeToReduxStores = () => {
    const homeReducers$ = this.store.select((state) => {
      return state.homeReducers;
    });

    homeReducers$.subscribe((homeReducers:any) => {
      // console.log('homeReducers', homeReducers)
      this.topPickTabs = homeReducers.topPickTabs;
      console.log('topPickTabs', this.topPickTabs)
    });
  }

  public setTopPickType = (type:string) => {
    this.topPickType = type;
  }

}