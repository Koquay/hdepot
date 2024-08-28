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

  public validation = {
    firstName: null,
    lastName: null,
    phone: null,
    address1: null,
    deliveryDate: null,

    cardNumber: null,
    expMonth: null,
    expYear: null,
    CVV: null,
  };

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
    // if(!this.validateCheckoutData()) {
    //   this.toastr.warning('All valid checkout information have not been entered.', '');
    //   return;
    // }

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

  public validateInput = (label, input) => {
    console.log('label', label)
    console.log('input', input)

    switch(label) {
      case 'firstName':
        if (!input) {
          this.validation.firstName = false;
        } else {
          this.validation.firstName = true;
        }
      break;

      case 'lastName':
        if (!input) {
          this.validation.lastName = false;
        } else {
          this.validation.lastName = true;
        }
      break;

      case 'phone':
        if (!input) {
          this.validation.phone = false;
        } else {
          this.validation.phone = true;
        }
      break;

      case 'address1':
        if (!input) {
          this.validation.address1 = false;
        } else {
          this.validation.address1 = true;
        }
      break;

      case 'deliveryDate':
        if (!input) {
          this.validation.deliveryDate = false;
        } else {
          this.validation.deliveryDate = true;
        }
      break;

      case 'cardNumber':
        if (!input) {
          this.validation.cardNumber = false;
        } else {
          this.validation.cardNumber = true;
        }
      break;

      case 'CVV':
        console.log('cvv length', input.length)
        if (!input) {
          this.validation.CVV = false;
        } 
        else if (input.length < 3) {
          this.validation.CVV = false;
        }
        else {
          this.validation.CVV = true;
        }
      break;

      case 'deliveryDate':
        if (!input) {
          this.validation.deliveryDate = false;
        } else {
          this.validation.deliveryDate = true;
        }
      break;

      case 'expMonth':
        if (!input) {
          this.validation.expMonth = false;
        } else {
          this.validation.expMonth = true;
        }
      break;

      case 'expYear':
        if (!input) {
          this.validation.expYear = false;
        } else {
          this.validation.expYear = true;
        }
      break;

    } 
    
  }

  // private validateCheckoutData = () => {
  //     let valid = true;
  
  //     if (!this.checkoutData?.deliveryAddress.firstName) {
  //       this.validation.firstName = false;
  //       valid = false;
  //     } else {
  //       this.validation.firstName = true;
  //     }
  
  //     if (!this.checkoutData?.deliveryAddress.lastName) {
  //       this.validation.lastName = false;
  //       valid = false;
  //     } else {
  //       this.validation.lastName = true;
  //     }
  
  //     if (!this.checkoutData?.deliveryAddress.phone) {
  //       this.validation.phone = false;
  //       valid = false;
  //     } else {
  //       this.validation.phone = true;
  //     }
  
  //     if (!this.checkoutData?.deliveryAddress.address1) {
  //       this.validation.address1 = false;
  //       valid = false;
  //     } else {
  //       this.validation.address1 = true;
  //     }

  //     if (!this.checkoutData?.applianceDelivery.deliveryDate) {
  //       this.validation.deliveryDate = false;
  //       valid = false;
  //     } else {
  //       this.validation.deliveryDate = true;
  //     }

  //     if (!this.checkoutData?.paymentMethod.cardNumber) {
  //       this.validation.cardNumber = false;
  //       valid = false;
  //     } else {
  //       this.validation.cardNumber = true;
  //     }

  //     if (!this.checkoutData?.paymentMethod.expMonth) {
  //       this.validation.expMonth = false;
  //       valid = false;
  //     } else {
  //       this.validation.expMonth = true;
  //     }
  
  //     if (!this.checkoutData?.paymentMethod.expYear) {
  //       this.validation.expYear = false;
  //       valid = false;
  //     } else {
  //       this.validation.expYear = true;
  //     }
  
  //     if (!this.checkoutData?.paymentMethod.CVV) {
  //       this.validation.CVV = false;
  //       valid = false;
  //     } else {
  //       this.validation.CVV = true;
  //     }
  
  //     return valid;
  // }

  public validationsChecked = () => {
    if(this.validation.firstName &&
    this.validation.lastName &&
    this.validation.phone &&
    this.validation.address1 &&
    this.validation.deliveryDate &&

    this.validation.cardNumber &&
    this.validation.expMonth &&
    this.validation.expYear &&
    this.validation.CVV) {
      return true;
    } else {
      return false;
    }
  };

}


//TODO
// 1. Data in checkoutData from reducer not displayed in form.
// 2. Pressin Enter submits placeOrder, Only clicking placeorder Button should submit order.
