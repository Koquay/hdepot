import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-popular-categories',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.scss'
})
export class PopularCategoriesComponent {
  public popularCategories:any;

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
      // console.log('popularCategories.homeReducers', homeReducers)
      this.popularCategories = homeReducers.popularCategories;
      console.log('popularCategories', this.popularCategories)
    });
  }

}
