import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { ItemsList } from './pages/items-list/items-list';
import { ItemDetails } from './pages/item-details/item-details';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'items', component: ItemsList },
  { path: 'items/:id', component: ItemDetails },
  { path: 'login', component: Login },
  { path: '**', redirectTo: '' },
];
