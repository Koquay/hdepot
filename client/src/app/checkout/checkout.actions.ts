import { createAction, props } from '@ngrx/store';

export const storeCheckoutData = createAction(
  '[storeCheckoutData] storeCheckoutData',
  props<{ checkoutData:any }>()
);


