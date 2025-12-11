// src/app/items/state/favorites.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import {
  addFavorite,
  removeFavorite,
  setFavorites,
  clearFavorites,
} from './favorites.actions';

import { selectItems } from './items.selectors';
import { selectFavorites } from './favorites.selectors';

import { AuthService } from '@services/auth.service';
import { UserProfileService } from '@services/user-profile.service';

import { map, switchMap, withLatestFrom, tap, filter } from 'rxjs/operators';

@Injectable()
export class FavoritesEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private auth: AuthService,
    private profile: UserProfileService
  ) {}

  // 🔥 1) Реальный контроль login/logout через auth.currentUser$
  authState$ = createEffect(() =>
    this.auth.currentUser$.pipe(
      // ждём, пока auth загрузится
      filter(v => v !== undefined),
      switchMap(user => {
        if (!user) {
          console.log("%cAUTH → LOGOUT DETECTED → Clearing favorites", "color:red");
          return [clearFavorites()];
        }

        const uid = user.uid;
        console.log("%cAUTH → LOGIN DETECTED → Load Firestore favorites", "color:green");

        return this.profile.getProfile(uid).pipe(
          withLatestFrom(this.store.select(selectItems)),
          map(([profile, allItems]) => {
            if (!profile) return clearFavorites();

            const favItems = allItems.filter(i =>
              profile.favorites.includes(i.id)
            );

            console.log("Loaded favorites:", favItems);
            return setFavorites({ items: favItems });
          })
        );
      })
    )
  );

  // 🔥 2) После добавления сохраняем в Firestore
  saveAfterAdd$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addFavorite),
        withLatestFrom(this.store.select(selectFavorites)),
        tap(([_, favorites]) => {
          const uid = this.auth.currentUserId;
          if (!uid) return;

          const ids = favorites.map(f => f.id);
          console.log("Saving ADD favorites to Firestore:", ids);
          this.profile.updateFavorites(uid, ids);
        })
      ),
    { dispatch: false }
  );

  // 🔥 3) После удаления сохраняем в Firestore
  saveAfterRemove$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeFavorite),
        withLatestFrom(this.store.select(selectFavorites)),
        tap(([_, favorites]) => {
          const uid = this.auth.currentUserId;
          if (!uid) return;

          const ids = favorites.map(f => f.id);
          console.log("Saving REMOVE favorites to Firestore:", ids);
          this.profile.updateFavorites(uid, ids);
        })
      ),
    { dispatch: false }
  );
}