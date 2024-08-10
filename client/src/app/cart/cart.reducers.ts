import { createReducer, on } from "@ngrx/store";
import { addItemToCart } from "./cart.actions";

const initialState = {
    cart: [],
}

export const CartReducers = createReducer(
    initialState,

    on(addItemToCart, (state, action) => {
        console.log('CartReducers.product', action.item)
        const existingItem = state.cart.find(item => item.product._id === action.item.product._id)

        if(existingItem) {
            existingItem.quantity++;
        } else {
            state.cart.push(action.item)
        }
        console.log('CartReducers.state', state)
        return {
        ...state,    
        };
    }),

  
  );