import { Component } from '@angular/core';
import { HomeHeroCarouselComponent } from './home-hero-carousel/home-hero-carousel.component';
import { TopPicksComponent } from "./top-picks/top-picks.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeHeroCarouselComponent,
    TopPicksComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(){}

  ngOnInit() {}


}
