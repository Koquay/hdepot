import { Injectable, OnInit } from '@angular/core';
import { CanActivate, CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartGuard implements CanActivate {

  constructor(
    private toastr: ToastrService,
  ) { }

  canActivate(): Observable<boolean> | boolean {
    if (this.isItemInCart()) {
      // this.toastr.warning('Okay to view cart', '');
      return true;
    }
    else {
      this.toastr.warning('Your cart is empty.', '');
      return false;
    }
    
  }

  private isItemInCart = () => {
    const hdepot = localStorage.getItem('hdepot');
    let cart = null;

    if(hdepot) {
      cart = JSON.parse(hdepot).cart;
    }

    if(cart?.length) {
      return true;
    } else {
      return false;
    }
  }
}
