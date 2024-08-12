import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { OrderSummaryComponent } from '../order/order-summary/order-summary.component';
import { storeCheckoutData } from './checkout.actions';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    OrderSummaryComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  public cart;
  public checkoutData;
  public APPLIANCE_DELIVERY = 29.99;
  public expirationMonths;
  public expirationYears;

  constructor(
    private store:Store<{cartReducers, checkoutReducers}>,
    private checkoutService:CheckoutService
  ){}

  ngOnInit() {    
    this.subscribeToRedux();
  }

  private subscribeToRedux = () => {

    const cartReducers$ = this.store.select((state) => {
      return state.cartReducers;
    });

    cartReducers$.subscribe((cartReducers:any) => {
      this.cart = cartReducers.cart;
      console.log('CheckoutComponent.cart', this.cart)
    });

    const checkoutReducers$ = this.store.select((state) => {
      return state.checkoutReducers;
    });

    checkoutReducers$.subscribe((checkoutReducers:any) => {
      this.checkoutData = JSON.parse(JSON.stringify(checkoutReducers.checkoutData));
      this.expirationMonths = checkoutReducers.expirationMonths;
      this.expirationYears = checkoutReducers.expirationYears;
      console.log('CheckoutComponent.checkoutData', this.checkoutData)
      console.log('CheckoutComponent.expirationMonths', this.expirationMonths)
      console.log('CheckoutComponent.expirationYears', this.expirationYears)
    });
  }

  public saveToDataStore = () => {
    console.log('CheckoutComponent.checkoutData', this.checkoutData)

    this.store.dispatch(storeCheckoutData({checkoutData: this.checkoutData}))
  }

  public placeOrder = () => {    
    const items = [];

    for(let item of this.cart) {
      items.push ({
        product: {
          _id: item.product._id,
          quantity: item.quantiyy,
          color: item.color,
          size: item.size
        }
      })
    }
    this.checkoutData.items = items;
    this.checkoutService.placeOrder(this.checkoutData)
  }
}
