import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { StoreTopPickProducts } from './product.actions';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = "/api/products/tabs";

  constructor(
    private httpClient: HttpClient,
    private store:Store
  ) { }

  public getTopPicks = (type:string) => {
    console.log('HomeService.getTopPicks called')

    const params = new HttpParams({
      fromObject: { type: type },
    });

    this.httpClient
      .get(this.url, { params: params })
      .pipe(
        tap((products) => {
          console.log('products', products);
          this.store.dispatch(StoreTopPickProducts({ products }));
        })
      )
      .subscribe();
  }
}
