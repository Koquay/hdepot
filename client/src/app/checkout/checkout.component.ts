import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { OrderSummaryComponent } from '../order/order-summary/order-summary.component';
import { CommonModule } from '@angular/common';
import { storeCheckoutData } from './checkout.actions';
import { CheckoutService } from './checkout.service';
import { FormsModule } from '@angular/forms';
import { CheckoutModel } from './checkout.model';

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
  public checkoutData = new CheckoutModel();
  public APPLIANCE_DELIVERY = 29.99;
  public expirationMonths;
  public expirationYears;

  // public validation = {
  //   firstName: null,
  //   lastName: null,
  //   phone: null,
  //   address1: null,
  //   deliveryDate: null,

  //   cardNumber: null,
  //   expMonth: null,
  //   expYear: null,
  //   CVV: null,
  // };

  constructor(
    private store:Store<{cartReducers, checkoutReducers}>,
    private checkoutService:CheckoutService,
    private toastr: ToastrService,
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

      // if(Object.keys(checkoutReducers?.checkoutData).length > 0) {
        this.checkoutData = JSON.parse(JSON.stringify(checkoutReducers.checkoutData))
        

        console.log('this.checkoutData 2', this.checkoutData);
      // }
      
      
      this.expirationMonths = checkoutReducers.expirationMonths;
      this.expirationYears = checkoutReducers.expirationYears;
      console.log('CheckoutComponent.checkoutData', this.checkoutData)
      console.log('CheckoutComponent.expirationMonths', this.expirationMonths)
      console.log('CheckoutComponent.expirationYears', this.expirationYears)
    });
  }


  public saveToDataStore = () => {
    this.store.dispatch(storeCheckoutData({checkoutData: this.checkoutData}))
  }

  public placeOrder = () => {    
    const hdepot = localStorage.getItem('hdepot');
    let token = null;

    if(hdepot) {
      token = JSON.parse(hdepot).user.token;
    }

    console.log('token', token)

    if(!token) {
      this.toastr.warning('Please sign in to place an order.', '');
      return;
    }    

    const items = [];

    for(let item of this.cart) {
      items.push (
         {
          product: item.product._id,
          quantity: item.quantity,
          color: item.color,
          size: item.size
        }
      )
    }

    this.checkoutData.items = items;
    console.log('CheckoutComponent.checkoutData 2', this.checkoutData)
    this.checkoutService.placeOrder(this.checkoutData)
  }


}


//TODO
