import { createReducer, on } from '@ngrx/store';
import { StoreCart, StoreUser } from './user.actions';
import { saveStateToLocalStorage } from '../shared/utils/localStorageUtils';
import { restoreStateFromLocalStorage } from '../app.actions';

const initialState = {
  user: {
    cart: {}
  },
  
};

export const UserReducers = createReducer(
  initialState,
  on(StoreUser, (state, action) => {
    console.log('action.user', action.user);

    state = {
      ...state,
      user: { ...action.user },
    };

    saveStateToLocalStorage(state);

    return {
      ...state,
    };
  }),

  on(StoreCart, (state, action) => {
    console.log('StoreCart.cart', action.cart);

    state.user.cart = { ...action.cart };

    // state = {
    //   ...state,
    //   cart: { ...action.cart },
    // };

    saveStateToLocalStorage(state);

    console.log('user reducer state', state)
    return {
      ...state,
    };
  }),

  on(restoreStateFromLocalStorage, (state, action) => {        
    // state.user = action.hdepot.user

    if(action.hdepot?.user) {
      state.user = action.hdepot?.user
      console.log('action.hdepot?.user', action.hdepot?.user)
  } else {
      state = initialState;
      console.log('state.user', state.user)
  }

    return {
      ...state
    }
  }),

  // on(SignOut, (state, action) => {
  //   state.user = {cart: {}}

  //   console.log('state.signOut', state)
  //   return {
  //     ...state,
  //   };
  // })


);
