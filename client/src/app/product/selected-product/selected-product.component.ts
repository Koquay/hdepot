import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreSelectedProduct } from '../product.actions';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RatingDirective } from '../../shared/directives/rating.directive';
import { DiscountPricePipe } from '../../shared/pipes/discount-price';
import { addItemToCart } from '../../cart/cart.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-selected-product',
  standalone: true,
  imports: [
    CommonModule,
    RatingDirective,
    DiscountPricePipe
  ],
  templateUrl: './selected-product.component.html',
  styleUrl: './selected-product.component.scss'
})
export class SelectedProductComponent {
  public selectedProduct;
  public productColor;
  public colorImgs = [];
  public currentGalleryImg = '';
  public productSize;

  constructor(
    private activatedRoute:ActivatedRoute,
    private store:Store<{productReducers}>,
    private toastr: ToastrService
  ){}
  
  ngOnInit() {
    this.subscribeToRedux();
    const productId = this.activatedRoute.snapshot.paramMap.get('productId')
    console.log('selectedProduct', productId)
    this.store.dispatch(StoreSelectedProduct({ productId }));
  }

  private subscribeToRedux = () => {

    const productReducers$ = this.store.select((state) => {
      return state.productReducers;
    });

    productReducers$.subscribe((productReducers:any) => {
      this.selectedProduct = productReducers.selectedProduct;
      console.log('selectedProduct', this.selectedProduct)
      this.currentGalleryImg = this.selectedProduct?.images[0]
      this.productColor = this.selectedProduct?.colorFinish.find(color => color.productId === this.selectedProduct._id).color

      this.colorImgs = this.selectedProduct?.colorFinish.filter(color => color.img)
      console.log('colorImgs', this.colorImgs)

      this.productSize = this.selectedProduct.sizes[0];
    });
  }

  public setCurrentGalleryImg = (img) => {
    this.currentGalleryImg = img;
  }
  public setProductSize = (size) => {
    this.productSize = size;
  }

  public getProductByColor = (color) => {
    const productId = color.productId;
    this.store.dispatch(StoreSelectedProduct({ productId }));
  }

  public addItemToCart = () => {
    const item = 
    {
      product:this.selectedProduct, 
      quantity: 1, 
      color:this.productColor, 
      size: this.productSize
    }
    
    try {
      this.store.dispatch(addItemToCart({ item }))
    } catch (e) {
      this.toastr.success('There was a problem adding your item to cart.', '');
      throw e;
    } finally {
      this.toastr.success('Item successfully added to cart.', '');
    }
    
  }
}
