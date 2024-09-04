import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-hero-carousel',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
  ],
  templateUrl: './home-hero-carousel.component.html',
  styleUrl: './home-hero-carousel.component.scss'
})
export class HomeHeroCarouselComponent {
  public heroCarouselImages:any;

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
        items: 1,
      },
      992: {
        items: 1,
      }
    }
  }

  constructor(
    private store: Store<{ homeReducers:any; }>
  ){}

  ngOnInit() {
    this.subscribeToRedux();
  }

  private subscribeToRedux = () => {
    const homeReducers$ = this.store.select((state) => {
      return state.homeReducers;
    });

    homeReducers$.subscribe((homeReducers:any) => {
      this.heroCarouselImages = homeReducers.heroCarouselImages;
    });
  }
}
