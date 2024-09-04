import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RatingDirective } from '../../shared/directives/rating.directive';
import { DiscountPricePipe } from '../../shared/pipes/discount-price';
import { ShortenAddEllipsisPipe } from '../../shared/pipes/shorten-add-ellipsis.pipe';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Store } from '@ngrx/store';
import { ProductService } from '../../product/product.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-pick-data',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    ShortenAddEllipsisPipe,
    DiscountPricePipe,
    RatingDirective,
    RouterModule

  ],
  templateUrl: './top-pick-data.component.html',
  styleUrl: './top-pick-data.component.scss'
})
export class TopPickDataComponent {
  @Input() 
  set topPickType(topPickType: string) {
    this.getTopPicks(topPickType)
  }

  public topPickProducts:any;

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
    this.subscribeToRedux();    
  }

  private subscribeToRedux = () => {

    const productReducers$ = this.store.select((state) => {
      return state.productReducers;
    });

    productReducers$.subscribe((productReducers:any) => {
      this.topPickProducts = productReducers.topPickProducts;
    });
  }

  public getTopPicks = (type:string) => {
    this.productService.getTopPicks(type);
  }


}
