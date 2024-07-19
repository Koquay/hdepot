import { createReducer, on } from "@ngrx/store";
import { StoreTopPickProducts } from "./product.actions";
const initialState = {
    topPickProducts: []
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
  
  );