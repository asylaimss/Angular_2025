import { createAction, props } from '@ngrx/store';
import { Item } from '../../services/item.model';

export const addFavorite = createAction(
  '[Favorites] Add Favorite',
  props<{ item: Item }>()
);

export const removeFavorite = createAction(
  '[Favorites] Remove Favorite',
  props<{ id: number }>()
);

export const setFavorites = createAction(
  '[Favorites] Set Favorites',
  props<{ items: Item[] }>()
);

export const clearFavorites = createAction(
  '[Favorites] Clear Favorites'
);