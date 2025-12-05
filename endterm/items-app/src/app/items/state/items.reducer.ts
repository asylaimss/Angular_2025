import { createReducer, on } from '@ngrx/store';
import { loadItemsSuccess } from './items.actions';
import { Item } from '../../services/item.model';

export interface ItemsState {
  items: Item[];
}

export const initialState: ItemsState = {
  items: []
};

export const itemsReducer = createReducer(
  initialState,

  on(loadItemsSuccess, (state, { items }) => ({
    ...state,
    items
  }))
);