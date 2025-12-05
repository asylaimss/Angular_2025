import { ActionReducer } from '@ngrx/store';
import { FavoritesState } from './favorites.reducer';

export function favoritesMetaReducer(
  reducer: ActionReducer<FavoritesState>
): ActionReducer<FavoritesState> {
  return (state, action) => {
    const nextState = reducer(state, action);

    try {
      localStorage.setItem(
        'favorites',
        JSON.stringify(nextState.favorites)
      );
    } catch {
      // если вдруг localStorage упадёт — просто игнорируем
    }

    return nextState;
  };
}