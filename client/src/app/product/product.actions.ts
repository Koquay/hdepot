import { createAction, props } from '@ngrx/store';

export const StoreTopPickProducts = createAction(
  '[Store TopPickProducts] Store TopPickProducts',
  props<{ products:any }>()
);
