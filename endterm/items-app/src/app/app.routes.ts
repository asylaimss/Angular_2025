// app.routes.ts
import { Routes } from '@angular/router';

// ПОДКЛЮЧАЕМ ТВОИ standalone компоненты
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { ItemsListComponent } from './pages/items-list/items-list';
import { ItemDetailsComponent } from './pages/item-details/item-details';
import { ProfileComponent } from './pages/profile/profile';
import { FavoritesComponent } from './pages/favorites/favorites';

// GUARD
import { AuthGuard } from './guards/auth.guard'; 
// 👆 если у тебя guard лежит не в /services, скажи — поправлю путь

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
    canActivate: [AuthGuard], // <-- GUARD тут!!!
  },

  { path: '**', redirectTo: 'home' },
];