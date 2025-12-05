import { createAction, props } from '@ngrx/store';
import { Item } from '../../services/item.model';

// LIST
export const loadItems = createAction(
  '[Items] Load Items',
  props<{ query?: string }>()
);

export const loadItemsSuccess = createAction(
  '[Items] Load Items Success',
  props<{ items: Item[] }>()
);

export const loadItemsFailure = createAction(
  '[Items] Load Items Failure',
  props<{ error: any }>()
);

// SINGLE ITEM
export const loadItem = createAction(
  '[Items] Load Item',
  props<{ id: number }>()
);

export const loadItemSuccess = createAction(
  '[Items] Load Item Success',
  props<{ item: Item }>()
);

export const loadItemFailure = createAction(
  '[Items] Load Item Failure',
  props<{ error: any }>()
);