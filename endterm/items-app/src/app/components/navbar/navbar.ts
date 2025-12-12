import { Component } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '@services/auth.service';
import { selectFavoritesCount } from '../../items/state/favorites.selectors';
import { TranslationService, Lang } from '../../services/translation.service';

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
    private store: Store,
    private router: Router,
    public i18n: TranslationService   // 🔥 ОБЯЗАТЕЛЬНО
  ) {}

  changeLang(lang: Lang) {
    this.i18n.setLang(lang);
  }

  async logout() {
    await this.auth.logout();
    this.store.dispatch({ type: '[Auth] Logout Success' });
    this.router.navigate(['/login']);
  }
}