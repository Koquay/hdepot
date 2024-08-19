import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { OrderSummaryComponent } from '../order/order-summary/order-summary.component';
import { CommonModule } from '@angular/common';
import { storeCheckoutData } from '../checkout/checkout.actions';
import { CheckoutService } from '../checkout/checkout.service';

@Component({
  selector: 'app-checkout2',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    OrderSummaryComponent
  ],
  templateUrl: './checkout2.component.html',
  styleUrl: './checkout2.component.scss'
})
export class Checkout2Component {
  checkoutForm: FormGroup = new FormGroup({});
  public cart;
  public checkoutData;
  public APPLIANCE_DELIVERY = 29.99;
  public expirationMonths;
  public expirationYears;

  constructor(
    private store:Store<{cartReducers, checkoutReducers}>,
    private checkoutService:CheckoutService,
    private toastr: ToastrService,
  ){}

  ngOnInit() {
    this.initCheckoutForm();
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

      if(Object.keys(checkoutReducers?.checkoutData).length > 0) {
        this.checkoutData = JSON.parse(JSON.stringify(checkoutReducers.checkoutData));

      
        this.checkoutForm = {...this.checkoutData}

        // console.log('this.checkoutData 2', this.checkoutData);
      console.log('ChecoutComponent.checkoutForm 2', this.checkoutForm);
      }
      
      
      this.expirationMonths = checkoutReducers.expirationMonths;
      this.expirationYears = checkoutReducers.expirationYears;
      console.log('CheckoutComponent.checkoutData', this.checkoutData)
      console.log('CheckoutComponent.expirationMonths', this.expirationMonths)
      console.log('CheckoutComponent.expirationYears', this.expirationYears)
    });
  }

  private initCheckoutForm = () => {
    this.checkoutForm = new FormGroup({
      // deliveryAddress: new FormGroup({ 
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        phone: new FormControl(''),
        address1: new FormControl(''),
        address2: new FormControl(''),
        useAsBillingAddress: new FormControl(''),
      // }),
      // applianceDelivery: new FormGroup({ 
          deliveryDate: new FormControl(''),
          specialInstructions: new FormControl(''),
      // }),
      // paymentMethod: new FormGroup({ 
          paymentType: new FormControl(''),
          cardNumber: new FormControl(''),
          expMonth: new FormControl(''),
          expYear: new FormControl(''),
          CVV: new FormControl(''),
          defaultCreditCard: new FormControl(''),
      // })
    });

    console.log('this.checkoutForm', this.checkoutForm.value);
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
    this.checkoutService.placeOrder(this.checkoutData)
  }
}
