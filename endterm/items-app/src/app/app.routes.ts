import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { ItemsList } from './pages/items-list/items-list';
import { ItemDetailsComponent } from './pages/item-details/item-details';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { ProfileComponent } from './pages/profile/profile';
import { FavoritesComponent } from './pages/favorites/favorites';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'items', component: ItemsList },
  { path: 'items/:id', component: ItemDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'favorites', component: FavoritesComponent },

];