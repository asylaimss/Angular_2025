import { Component } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Store } from '@ngrx/store';
import { AuthService } from '@services/auth.service';
import { selectFavoritesCount } from '../../items/state/favorites.selectors';
import { clearFavorites } from '../../items/state/favorites.actions';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  imports: [NgIf, AsyncPipe, RouterLink],
})
export class NavbarComponent {

  favoritesCount$ = this.store.select(selectFavoritesCount);

  constructor(
    public auth: AuthService,
    private store: Store
  ) {}

  async logout() {
    await this.auth.logout();
    this.store.dispatch(clearFavorites()); // UI очищается
  }
}