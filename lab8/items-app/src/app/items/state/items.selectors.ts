import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemsState } from './items.reducer';

export const selectItemsState =
  createFeatureSelector<ItemsState>('items');

// List
export const selectItems = createSelector(
  selectItemsState,
  (state) => state.items
);

export const selectListLoading = createSelector(
  selectItemsState,
  (state) => state.loadingList
);

export const selectListError = createSelector(
  selectItemsState,
  (state) => state.errorList
);

// Single item
export const selectItem = createSelector(
  selectItemsState,
  (state) => state.selectedItem
);

export const selectItemLoading = createSelector(
  selectItemsState,
  (state) => state.loadingItem
);

export const selectItemError = createSelector(
  selectItemsState,
  (state) => state.errorItem
);
