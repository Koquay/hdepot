import { createAction, props } from '@ngrx/store';

export const StoreUser = createAction(
  '[Store User] Store User',
  props<{ user }>()
);

export const StoreCart = createAction(
  '[Store Cart] Store Cart',
  props<{ cart }>()
);

// export const restoreUserState = createAction (
//   '[Restore User] Restore User State]',
//   props<{ hdepot: {} }>()
// );

