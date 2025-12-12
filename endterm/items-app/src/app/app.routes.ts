import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { ItemsListComponent } from './pages/items-list/items-list';
import { ItemDetailsComponent } from './pages/item-details/item-details';
import { ProfileComponent } from './pages/profile/profile';
import { FavoritesComponent } from './pages/favorites/favorites';
import { OfflineComponent } from './pages/offline/offline';

import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'items', component: ItemsListComponent },
  { path: 'items/:id', component: ItemDetailsComponent },

  { path: 'favorites', component: FavoritesComponent },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },

  // 🔴 OFFLINE СЮДА
  {
    path: 'offline',
    component: OfflineComponent,
  },

  // ⛔ ВСЕГДА ПОСЛЕДНИМ
  { path: '**', redirectTo: 'home' },
];