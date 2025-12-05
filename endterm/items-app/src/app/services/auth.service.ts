import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User,
  user,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';
import { FavoritesSyncService } from '../items/state/favorites-sync.service';
import { Store } from '@ngrx/store';
import { clearFavorites } from '../items/state/favorites.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);
  private store = inject(Store);
  private favoritesSync = inject(FavoritesSyncService);

  currentUser$: Observable<User | null> = user(this.auth);

  userLoggedIn$ = new Subject<User>();
  userLoggedOut$ = new Subject<void>();

  constructor() {}

  async signup(email: string, password: string) {
    const result = await createUserWithEmailAndPassword(this.auth, email, password);

    if (result.user) {
      await this.favoritesSync.mergeLocalAndServer(result.user.uid);
      this.userLoggedIn$.next(result.user);
    }

    return result;
  }

  async login(email: string, password: string) {
    const result = await signInWithEmailAndPassword(this.auth, email, password);

    if (result.user) {
      await this.favoritesSync.loadFromFirestore(result.user.uid);
      this.userLoggedIn$.next(result.user);
    }

    return result;
  }

  async logout() {
    const current = this.auth.currentUser;

    if (current) {
      await this.favoritesSync.saveToFirestore(current.uid);
    }

    await signOut(this.auth);

    localStorage.removeItem('favorites');
    this.store.dispatch(clearFavorites());

    this.userLoggedOut$.next();
  }
}