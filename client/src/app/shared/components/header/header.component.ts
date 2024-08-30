import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductSearchComponent } from '../../../product/product-search/product-search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    ProductSearchComponent
    
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public numberOfItems;
  public user;

  constructor(
    private store:Store<{cartReducers, userReducers}>
  ){}

  ngOnInit() {
    this.subscribeToRedux();        
  }

  private subscribeToRedux = () => {

    const cartReducers$ = this.store.select((state) => {
      return state.cartReducers;
    });

    cartReducers$.subscribe((cartReducers:any) => {
      this.numberOfItems = cartReducers.cart.length;
    });

    const userReducers$ = this.store.select((state) => {
      return state.userReducers;
    });

    userReducers$.subscribe((userReducers:any) => {
      this.user = userReducers.user;
    });
      
  }
}
