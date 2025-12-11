import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient } from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { itemsReducer } from './items/state/items.reducer';
import { favoritesReducer } from './items/state/favorites.reducer';

import { provideEffects } from '@ngrx/effects';
import { ItemsEffects } from './items/state/items.effects';
import { FavoritesEffects } from './items/state/favorites.effects';  // ⬅️ Добавили

import { provideStoreDevtools } from '@ngrx/store-devtools';

// FIREBASE
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),

    // Firebase
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: " ",
        authDomain: " ",
        projectId: " ",
        storageBucket: " ",
        messagingSenderId: " ",
        appId: " "
      })
    ),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),

    // NGRX STORE CONFIG
    provideStore({
      items: itemsReducer,
      favorites: favoritesReducer
    }),

    // Effects
    provideEffects([
      ItemsEffects,
      FavoritesEffects  // ⬅️ Подключили favorites effects
    ]),

    provideStoreDevtools(),
  ]
};