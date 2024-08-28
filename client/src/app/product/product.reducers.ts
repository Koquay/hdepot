import { createReducer, on } from "@ngrx/store";
import { StoreBreadcrumbProduct, StoreSelectedProduct, StoreTopPickProducts } from "./product.actions";
import { saveStateToLocalStorage } from "../shared/utils/localStorageUtils";
import { restoreStateFromLocalStorage } from "../app.actions";

const initialState = {
    topPickProducts: [],
    selectedProduct: {},
    products: []
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

    on(StoreBreadcrumbProduct, (state, action) => {
      console.log('action.selectedProduct', action.selectedProduct)
    
    return {
      ...state,
      products: [...state.products, action.selectedProduct],
      selectedProduct: action.selectedProduct,
      
    };
    }),

    on(restoreStateFromLocalStorage, (state, action) => {        
        // state.topPickProducts = action.hdepot.topPickProducts
        // state.selectedProduct = action.hdepot.selectedProduct

        if(action.hdepot?.topPickProducts) {
          state.topPickProducts = action.hdepot?.topPickProducts
          console.log('action.hdepot?.topPickProducts', action.hdepot?.topPickProducts)
      } else {
          state = initialState;
          console.log('state.topPickProducts', state.topPickProducts)
      }

      if(action.hdepot?.selectedProduct) {
        state.selectedProduct = action.hdepot?.selectedProduct
        console.log('action.hdepot?.selectedProduct', action.hdepot?.selectedProduct)
    } else {
        state = initialState;
        console.log('state.selectedProduct', state.selectedProduct)
    }
    
        return {
          ...state
        }
      }),
  
  );