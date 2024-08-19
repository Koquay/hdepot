import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { OrderSummaryComponent } from '../order/order-summary/order-summary.component';
import { storeCheckoutData } from './checkout.actions';
import { CheckoutService } from './checkout.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
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
  checkoutForm!: FormGroup;

  constructor(
    private store:Store<{cartReducers, checkoutReducers}>,
    private checkoutService:CheckoutService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ){}

  ngOnInit() {
    // this.subscribeToRedux();    
    // this.initCheckoutForm();

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

      if(Object.keys(checkoutReducers.checkoutData).length > 0) {
        this.checkoutData = JSON.parse(JSON.stringify(checkoutReducers.checkoutData));

      
        this.checkoutForm = {...this.checkoutData}

        console.log('this.checkoutData 2', this.checkoutData);
      console.log('this.checkoutForm 2', this.checkoutForm);
      }
      
      
      this.expirationMonths = checkoutReducers.expirationMonths;
      this.expirationYears = checkoutReducers.expirationYears;
      console.log('CheckoutComponent.checkoutData', this.checkoutData)
      console.log('CheckoutComponent.expirationMonths', this.expirationMonths)
      console.log('CheckoutComponent.expirationYears', this.expirationYears)
    });
  }

  private initCheckoutForm = () => {
    this.checkoutForm = this.formBuilder.group({
      deliveryAddress: this.formBuilder.group({ 
        firstName: [''],
        lastName: [''],
        phone: [''],
        address1: [''],
        address2: [''],
        useAsBillingAddress: [''],
      }),
      applianceDelivery: this.formBuilder.group({ 
          deliveryDate: [''],
          specialInstructions: [''],
      }),
      paymentMethod: this.formBuilder.group({ 
          paymentType: 'Credit Card',
          cardNumber: [''],
          expMonth: [''],
          expYear: [''],
          CVV: [''],
          defaultCreditCard: [''],
      })
    });

    console.log('this.checkoutForm', this.checkoutForm.value);
  }

  public onSubmit = () => {
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
