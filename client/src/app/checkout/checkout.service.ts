import { HttpClient, HttpParams } from '@angular/common/http';
import { TagContentType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private url = '/api/orders'

  constructor(
    private httpClient: HttpClient) { }

  public placeOrder = (orderData) => {

    this.httpClient.post(this.url, orderData).pipe(
      tap(order => {
        console.log('new order', order)
      })
    ).subscribe()
  } 
}
