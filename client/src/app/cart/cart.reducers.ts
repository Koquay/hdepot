import { createReducer, on } from "@ngrx/store";
import { addItemToCart } from "./cart.actions";
import { restoreStateFromLocalStorage } from "../app.actions";
import { saveStateToLocalStorage } from "../shared/utils/localStorageUtils";

const initialState = {
    cart: [],
}

export const CartReducers = createReducer(
    initialState,

    on(addItemToCart, (state, action) => {
        console.log('CartReducers.product', action.item)
        const existingItem = state.cart?.find(item => item.product._id === action.item.product._id)

        if(existingItem) {
            existingItem.quantity++;
        } else {
            state.cart.push(action.item)
        }
        console.log('CartReducers.state', state)

        saveStateToLocalStorage(state);

        return {
        ...state,    
        };
    }),

    on(restoreStateFromLocalStorage, (state, action) => {        
        state.cart = action.hdepot.cart || []
    
        return {
          ...state
        }
      }),
  
  );