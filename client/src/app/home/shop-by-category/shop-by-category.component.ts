import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shop-by-category',
  standalone: true,
  imports: [
    CommonModule,
    NgClass
  ],
  templateUrl: './shop-by-category.component.html',
  styleUrl: './shop-by-category.component.scss'
})
export class ShopByCategoryComponent {
  public categories:any;

  constructor(
    private store: Store<{ homeReducers:any; }>,
  ){}

  ngOnInit() {
    this.subscribeToReduxStores();    
  }

  private subscribeToReduxStores = () => {
    const homeReducers$ = this.store.select((state) => {
      return state.homeReducers;
    });

    homeReducers$.subscribe((homeReducers:any) => {
      // console.log('categories.homeReducers', homeReducers)
      this.categories = homeReducers.categories;
      console.log('categories', this.categories)
    });
  }
}
