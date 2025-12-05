import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient } from '@angular/common/http';

// NGRX
import { provideStore } from '@ngrx/store';
import { itemsReducer } from './items/state/items.reducer';
import { favoritesReducer } from './items/state/favorites.reducer';
import { favoritesMetaReducer } from './items/state/favorites.metareducer';
import { provideEffects } from '@ngrx/effects';
import { ItemsEffects } from './items/state/items.effects';
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

    // Firebase init
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: ""
      })
    ),

    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),

    // NGRX STORE
    provideStore(
  {
    items: itemsReducer,

    // фикс типизации FavoritesState
    favorites: (state, action) =>
      favoritesReducer(state as any, action)
  },
  {
    metaReducers: [favoritesMetaReducer]
  }
),

    provideEffects([ItemsEffects]),
    provideStoreDevtools(),
  ]
};