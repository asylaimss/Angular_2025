import { createReducer, on } from '@ngrx/store';
import {
  addFavorite,
  removeFavorite,
  setFavorites,
  clearFavorites
} from './favorites.actions';
import { Item } from '../../services/item.model';

export interface FavoritesState {
  favorites: Item[];
}

// Безопасная загрузка из localStorage
function loadFromLocalStorage(): Item[] {
  try {
    const raw = localStorage.getItem('favorites');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export const initialState: FavoritesState = {
  favorites: loadFromLocalStorage()
};

export const favoritesReducer = createReducer(
  initialState,

  on(addFavorite, (state, { item }) => ({
    ...state,
    favorites: state.favorites.some(f => f.id === item.id)
      ? state.favorites
      : [...state.favorites, item]
  })),

  on(removeFavorite, (state, { id }) => ({
    ...state,
    favorites: state.favorites.filter(i => i.id !== id)
  })),

  on(setFavorites, (state, { items }) => ({
    ...state,
    favorites: items
  })),

  on(clearFavorites, () => ({
    favorites: []
  }))
);