import { createAction, props } from '@ngrx/store';

export const restoreStateFromLocalStorage = createAction(
    '[restoreStateFromLocalStorage] restoreStateFromLocalStorage',
    props<{ hdepot:any }>()
  );