import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
// import { StoreSearchResults } from '../product.actions';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {

  
  private url = '/api/products/type';

  constructor(
    private httpClient: HttpClient,
    private store:Store
  ) {}

  public searchProducts = (searchField) => {
    const params = new HttpParams({
      fromObject: { searchField: searchField },
    });

    return this.httpClient.get('/api/products/search/1', {params}).pipe(
      tap(searchResults => {
        console.log('searchResults', searchResults)
      })
    )
  };
}
