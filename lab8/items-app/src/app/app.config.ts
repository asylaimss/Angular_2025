import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { itemsReducer } from './items/state/items.reducer';
import { provideEffects } from '@ngrx/effects';
import { ItemsEffects } from './items/state/items.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),

    provideStore({ items: itemsReducer }),
    provideEffects([ItemsEffects]),
    provideStoreDevtools(),
  ],
};
