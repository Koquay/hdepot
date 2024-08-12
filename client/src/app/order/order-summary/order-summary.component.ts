import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent {
  public cart;
  public APPLIANCE_DELIVERY = 29.99;

  constructor(
    private store:Store<{cartReducers}>
  ){}

  ngOnInit() {    
    this.subscribeToRedux();
  }

  private subscribeToRedux = () => {

    const productReducers$ = this.store.select((state) => {
      return state.cartReducers;
    });

    productReducers$.subscribe((cartReducers:any) => {
      this.cart = cartReducers.cart;
      console.log('CartComponent.cart', this.cart)
    });
  }

  public getSubtotal = () => {
    const subtotal = this.cart.reduce((acc, item) => {                     
      const discount = item.product.discount/100 * item.product.price;
       return (acc += (item.product.price * item.quantity - discount));
    }, 0);

    return subtotal;
  }

  public getDiscount = () => {
    const discount = this.cart.reduce((acc, item) => {                     
      return acc +=  item.product.discount/100 * item.product.price;
    }, 0);

    return discount;
  }

  public getTotal = () => {
    return this.getSubtotal() + this.APPLIANCE_DELIVERY;
  }
}
