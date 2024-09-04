import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductSearchService } from './product-search.service';
import { Store } from '@ngrx/store';
import { StoreSelectedProduct } from '../product.actions';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent {

  public searchItems;
  public searchResults;
  public showSearchResult = false;
  public searchSubject = new Subject();
  public searchField;

  constructor(
    private productSearchService:ProductSearchService,
    private store:Store
  ){}

  ngOnInit() {
    this.handleSearch();
  }

  private handleSearch() {
    this.searchSubject.pipe(
      distinctUntilChanged(),
      debounceTime(400)
    ).subscribe(value => {      

      this.search(value)
    });
  }

  search = (value) => {
    this.productSearchService.searchProducts(value).subscribe(results => {      
      this.searchResults = results;
      console.log('this.searchResults', this.searchResults)
    }) 

    if (value) {
      this.showSearchResult = true;
    } else {
      this.showSearchResult = false;
    }
  }

  public setSelectedProduct = (productId) => {      
    this.store.dispatch(StoreSelectedProduct({productId}))
    this.searchResults = [];
  }

  clearSearchbox = () => {
    this.searchResults = [];
    this.searchField = null;
    this.searchSubject.next(this.searchField);
  }

  ngDoCheck() {
    this.searchSubject.next(this.searchField);
  }



}
