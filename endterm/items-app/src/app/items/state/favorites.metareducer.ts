import { ActionReducer } from '@ngrx/store';

export function favoritesMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    const nextState = reducer(state, action);

    try {
      const favs = nextState?.favorites?.favorites;
      if (Array.isArray(favs)) {
        localStorage.setItem('favorites', JSON.stringify(favs));
      }
    } catch {
      // ignore
    }

    return nextState;
  };
}