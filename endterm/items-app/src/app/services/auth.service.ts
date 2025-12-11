import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { setFavorites, clearFavorites } from '../items/state/favorites.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  static instance: AuthService;

  user$: Observable<User | null>;
  currentUser$: Observable<User | null>;

  constructor(
    private afAuth: Auth,
    private store: Store
  ) {
    this.user$ = authState(this.afAuth);
    this.currentUser$ = this.user$;

    AuthService.instance = this;

    // 🔥 главный механизм восстановления избранных
    this.user$.subscribe(user => {
      if (user) {
        const key = `favorites_${user.uid}`;
        const raw = localStorage.getItem(key);
        try {
          const favs = raw ? JSON.parse(raw) : [];
          this.store.dispatch(setFavorites({ items: favs }));
        } catch {
          this.store.dispatch(setFavorites({ items: [] }));
        }
      } else {
        // logout
        this.store.dispatch(clearFavorites());
      }
    });
  }

  get currentUserId(): string | null {
    return this.afAuth.currentUser ? this.afAuth.currentUser.uid : null;
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.afAuth, email, password);
  }

  signup(email: string, password: string) {
    return createUserWithEmailAndPassword(this.afAuth, email, password);
  }

  async logout() {
    const uid = this.currentUserId;
    if (uid) {
      // not removing user data so it loads again later
      console.log('User logged out—favorites remain saved for next login');
    }
    return signOut(this.afAuth);
  }
}