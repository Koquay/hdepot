import { createAction, props } from '@ngrx/store';

export const addItemToCart = createAction(
  '[addItemToCart] addItemToCart',
  props<{ item:any }>()
);


