import { createReducer, on } from '@ngrx/store';
import * as ItemsActions from './items.actions';
import { Item } from '../../services/item.model';

export interface ItemsState {
  items: Item[];
  selectedItem: Item | null;

  loadingList: boolean;
  loadingItem: boolean;

  errorList: string | null;
  errorItem: string | null;
}

export const initialState: ItemsState = {
  items: [],
  selectedItem: null,

  loadingList: false,
  loadingItem: false,

  errorList: null,
  errorItem: null,
};

export const itemsReducer = createReducer(
  initialState,

  // List
  on(ItemsActions.loadItems, (state) => ({
    ...state,
    loadingList: true,
    errorList: null,
  })),

  on(ItemsActions.loadItemsSuccess, (state, { items }) => ({
    ...state,
    loadingList: false,
    items,
  })),

  on(ItemsActions.loadItemsFailure, (state, { error }) => ({
    ...state,
    loadingList: false,
    errorList: error,
  })),

  // Single item
  on(ItemsActions.loadItem, (state) => ({
    ...state,
    loadingItem: true,
    errorItem: null,
  })),

  on(ItemsActions.loadItemSuccess, (state, { item }) => ({
    ...state,
    loadingItem: false,
    selectedItem: item,
  })),

  on(ItemsActions.loadItemFailure, (state, { error }) => ({
    ...state,
    loadingItem: false,
    errorItem: error,
  }))
);
