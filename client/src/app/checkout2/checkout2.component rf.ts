import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    private formBuilder: FormBuilder,
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

        // this.checkoutForm = {...this.checkoutData}
        this.checkoutForm.setValue(this.checkoutData);

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
    this.checkoutForm = this.formBuilder.group({
      deliveryAddress: this.formBuilder.group({ 
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', Validators.required],
        address1: ['', Validators.required],
        address2: [''],
        useAsBillingAddress: [''],
      }),
      applianceDelivery: this.formBuilder.group({ 
          deliveryDate: ['', Validators.required],
          specialInstructions: [''],
      }),
      paymentMethod: this.formBuilder.group({ 
          paymentType: ['', Validators.required],
          cardNumber: ['', Validators.required],
          expMonth: ['', Validators.required],
          expYear: ['', Validators.required],
          CVV: ['', Validators.required],
          defaultCreditCard: [''],
      })
    });

    console.log('this.checkoutForm', this.checkoutForm.value);
  }

  get firstName() {    
    console.log("this.ischeckkoutForm.get('firstName')", this.checkoutForm.get('firstName'))
    return this.checkoutForm.get('firstName');  
  }

  public saveToDataStore = () => {
    // this.store.dispatch(storeCheckoutData({checkoutData: this.checkoutData}))
    this.store.dispatch(storeCheckoutData({checkoutData: this.checkoutForm.value}))
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

    this.checkoutData = {...this.checkoutForm.value}
    this.checkoutData.items = items;
    console.log('CheckoutComponent.checkoutData 2', this.checkoutData)
    this.checkoutService.placeOrder(this.checkoutData)
  }
}
