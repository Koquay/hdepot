import { createAction, props } from '@ngrx/store';

export const StoreTopPickProducts = createAction(
  '[Store TopPickProducts] Store TopPickProducts',
  props<{ products:any }>()
);

export const StoreSelectedProduct = createAction(
  '[Store Selected Product] Store Selected Product',
  props<{ productId:any }>()
);
