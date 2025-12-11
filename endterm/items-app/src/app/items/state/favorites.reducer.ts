import { createReducer, on } from '@ngrx/store';
import {
  addFavorite,
  removeFavorite,
  setFavorites,
  clearFavorites
} from './favorites.actions';

import { Item } from '../../services/item.model';
import { AuthService } from '../../services/auth.service';

export interface FavoritesState {
  favorites: Item[];
}

// Получаем ключ localStorage для текущего пользователя
function getStorageKey(): string {
  const uid = AuthService.instance?.currentUserId;
  return uid ? `favorites_${uid}` : 'favorites_guest';
}

// Загружаем избранные из localStorage текущего пользователя
function loadFromLocalStorage(): Item[] {
  try {
    const raw = localStorage.getItem(getStorageKey());
    if (!raw) return [];
    const parsed = JSON.parse(raw);

    return Array.isArray(parsed)
      ? parsed.filter(i => i && i.id !== null && i.id !== undefined)
      : [];
  } catch {
    return [];
  }
}

export const initialState: FavoritesState = {
  favorites: loadFromLocalStorage()
};

export const favoritesReducer = createReducer(
  initialState,

  // Добавление в избранные
  on(addFavorite, (state, { item }) => {
    const updated = state.favorites.some(f => f.id === item.id)
      ? state.favorites
      : [...state.favorites, item];

    localStorage.setItem(getStorageKey(), JSON.stringify(updated));

    return { favorites: updated };
  }),

  // Удаление из избранных
  on(removeFavorite, (state, { id }) => {
    const updated = state.favorites.filter(i => i.id !== id);

    localStorage.setItem(getStorageKey(), JSON.stringify(updated));

    return { favorites: updated };
  }),

  // Устанавливаем избранные из AuthService при логине
  on(setFavorites, (state, { items }) => {
    const updated = items.filter(i => i && i.id !== null && i.id !== undefined);

    localStorage.setItem(getStorageKey(), JSON.stringify(updated));

    return { favorites: updated };
  }),

  // Очищаем избранные при logout
  on(clearFavorites, () => {
    localStorage.removeItem(getStorageKey());
    return { favorites: [] };
  })
);