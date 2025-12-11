// src/app/items/state/favorites.reducer.ts
import { createReducer, on } from '@ngrx/store';
import {
  addFavorite,
  removeFavorite,
  setFavorites,
  clearFavorites,
} from './favorites.actions';
import { Item } from '../../services/item.model';
import { AuthService } from '../../services/auth.service';

export interface FavoritesState {
  favorites: Item[];
}

/**
 * Ключ в localStorage зависит от текущего пользователя.
 * Гость → 'favorites_guest'
 * Пользователь → 'favorites_<uid>'
 */
function getStorageKey(): string {
  const uid = AuthService.instance?.currentUserId;
  return uid ? `favorites_${uid}` : 'favorites_guest';
}

function loadFromLocalStorage(): Item[] {
  try {
    const raw = localStorage.getItem(getStorageKey());
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export const initialState: FavoritesState = {
  favorites: loadFromLocalStorage(),
};

export const favoritesReducer = createReducer(
  initialState,

  // ➕ Add
  on(addFavorite, (state, { item }) => {
    const updated = state.favorites.some(f => f.id === item.id)
      ? state.favorites
      : [...state.favorites, item];

    localStorage.setItem(getStorageKey(), JSON.stringify(updated));
    return { favorites: updated };
  }),

  // ➖ Remove
  on(removeFavorite, (state, { id }) => {
    const updated = state.favorites.filter(f => f.id !== id);
    localStorage.setItem(getStorageKey(), JSON.stringify(updated));
    return { favorites: updated };
  }),

  // 🔁 Установить favorites (после логина / загрузки из Firestore)
  on(setFavorites, (state, { items }) => {
    localStorage.setItem(getStorageKey(), JSON.stringify(items));
    return { favorites: items };
  }),

  // 🚪 Logout
  on(clearFavorites, () => {
    localStorage.removeItem(getStorageKey());
    return { favorites: [] };
  })
);