import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {

  
  private url = '/api/products/type';

  constructor(private httpClient: HttpClient) {}

  public searchProducts = (searchField) => {
    const params = new HttpParams({
      fromObject: { searchField: searchField },
    });

    return this.httpClient.get('/api/products/search/1', {params}).pipe(
      tap(searchProducts => {
        console.log('searchProducts', searchProducts)
      })
    )

    // return of(['abcd', 'efgh']);
  };
}
