import { createReducer, on } from "@ngrx/store";
import { StoreSelectedProduct, StoreTopPickProducts } from "./product.actions";
const initialState = {
    topPickProducts: [],
    selectedProduct: {}
}

export const ProductReducers = createReducer(
    initialState,

    on(StoreTopPickProducts, (state, action) => {
        console.log('productReducers.topPickProducts', action.products)
        return {
        ...state,    
        topPickProducts: action.products
        };
    }),

    on(StoreSelectedProduct, (state, action) => {
        console.log('productReducers.selectedProductId', action.productId)
        return {
        ...state,    
        selectedProduct: state.topPickProducts.find(product => product._id === action.productId)
        };
    }),
  
  );