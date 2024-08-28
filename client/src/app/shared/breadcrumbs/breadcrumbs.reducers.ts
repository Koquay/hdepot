import { createReducer, on } from '@ngrx/store';
// import { StoreBreadcrumbProduct } from './breadcrumbs.actions';

const initialState = {
  productId: null,
  productName: null,
};

// export const BreadcrumbsReducers = createReducer(
//   initialState,
//   on(StoreBreadcrumbProduct, (state, action) => {
//     console.log('breadcrumbs.reducer.action', action);
//     return {
//       ...state,
//       productId: action.productId,
//       productName: action.productName,
//     };
//   })
// );
