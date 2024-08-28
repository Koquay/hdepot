import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Route,
  Router,
  RouterModule,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { StoreSelectedProduct } from '../../product/product.actions';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  public breadcrumbs = [];
  public productName = null;
  public selectedProductId = null;

  constructor(
    private router: Router,
    private store: Store<{ productsReducers }>
  ) {}

  ngOnInit(): void {
    this.subscribeToReduxStores();
    this.buildBreadcrumbs();    
  }

  private buildBreadcrumbs = () => {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let url = this.router.url;                

        let label = url.substring(1);
        console.log('url', url);        

        if (label.includes('/')) {
          let index = label.indexOf('/');
          label = label.substring(0, index);
        }

        // if (label.startsWith('category')) {
        //   label = url.replace('/category/', '')

        //   if(label.length > 20) {
        //     label = label.substring(0, 20) + '...';
        //   }
        //   label = label.replaceAll('_', ' ');
        // }

        label = label.replaceAll('-', ' ');

        if(url.startsWith('/selectedProduct')) {     
          label = this.productName?.substring(0, 20).trim() + '...'
        }

        let breadcrumb = { label, url };

        this.breadcrumbs = this.breadcrumbs?.filter(
          (breadcrumb) => breadcrumb.url !== url
        );
        this.breadcrumbs?.push(breadcrumb);

        console.log('breadcrumbs', this.breadcrumbs);

        if (this.breadcrumbs.length === 1) {
          if (breadcrumb.url !== '/home') {
            let state = JSON.parse(localStorage.getItem('hdepot'));
            this.breadcrumbs = state.breadcrumbs;
          }
        }

        let state = JSON.parse(localStorage.getItem('hdepot')) || {};
        state.breadcrumbs = this.breadcrumbs;
        localStorage.setItem('hdepot', JSON.stringify(state));
        
      }
    });
  };

  private subscribeToReduxStores = () => {
    const productData$ = this.store.select((state) => {
      return state.productsReducers;
    });

    console.log('Breadcrumbs.productData$', productData$)

    productData$.subscribe((productData) => { 
      this.productName = productData?.selectedProduct?.name || 'product'
      this.selectedProductId = productData?.selectedProduct?._id ;
    });
  };

  navigateToUrl = (url) => {

    if(url.startsWith('/selectedProduct')) {
      const productId = url.split('/')[2]
      this.store.dispatch(StoreSelectedProduct({productId}))
    }

    this.router.navigateByUrl(url);
  }

  public clearBreadcrumbs = () => {
    this.breadcrumbs = [this.breadcrumbs[this.breadcrumbs.length - 1]]
  }
}
