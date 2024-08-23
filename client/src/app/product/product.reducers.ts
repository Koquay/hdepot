import { createReducer, on } from "@ngrx/store";
import { StoreSelectedProduct, StoreTopPickProducts } from "./product.actions";
import { saveStateToLocalStorage } from "../shared/utils/localStorageUtils";
import { restoreStateFromLocalStorage } from "../app.actions";

const initialState = {
    topPickProducts: [],
    selectedProduct: {}
}

export const ProductReducers = createReducer(
    initialState,

    on(StoreTopPickProducts, (state, action) => {
        console.log('productReducers.topPickProducts', action.products)

        state = {
            ...state,    
            topPickProducts: action.products
          };

        saveStateToLocalStorage(state);

        return {
        ...state,    
        };
    }),

    on(StoreSelectedProduct, (state, action) => {
        console.log('productReducers.selectedProductId', action.productId)

        state = {
            ...state,    
            selectedProduct: state.topPickProducts.find(product => product._id === action.productId)        
          };

        saveStateToLocalStorage(state);

        return {
        ...state
        };
    }),

    on(restoreStateFromLocalStorage, (state, action) => {        
        state.topPickProducts = action.hdepot.topPickProducts
        state.selectedProduct = action.hdepot.selectedProduct
    
        return {
          ...state
        }
      }),
  
  );