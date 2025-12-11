// src/app/services/auth.service.ts

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

import { UserProfileService } from '@services/user-profile.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static instance: AuthService;

  user$: Observable<User | null>;
  currentUser$: Observable<User | null>;

  constructor(
    private afAuth: Auth,
    private userProfile: UserProfileService,
    private store: Store
  ) {
    this.user$ = authState(this.afAuth);
    this.currentUser$ = this.user$;
    AuthService.instance = this;
  }

  get currentUserId(): string | null {
    return this.afAuth.currentUser ? this.afAuth.currentUser.uid : null;
  }

  // LOGIN
  async login(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(this.afAuth, email, password);

    // событие для Effects
    this.store.dispatch({ type: '[Auth] Login Success' });

    return cred;
  }

  // SIGNUP + создание профиля в Firestore
  async signup(email: string, password: string) {
    const cred = await createUserWithEmailAndPassword(this.afAuth, email, password);

    await this.userProfile.ensureUserProfile(cred.user);

    // после регистрации считаем, что юзер залогинен
    this.store.dispatch({ type: '[Auth] Login Success' });

    return cred;
  }

  // LOGOUT
  async logout() {
    await signOut(this.afAuth);
    return true;
    //this.store.dispatch({ type: '[Auth] Logout Success' });
  }
}