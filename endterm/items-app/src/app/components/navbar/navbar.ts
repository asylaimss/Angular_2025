import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectFavoritesCount } from '../../items/state/favorites.selectors';

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
  private router: Router   // ← ДОБАВИТЬ ЭТО!
) {}

  logout() {
  this.auth.logout().then(() => {
    this.store.dispatch({ type: '[Auth] Logout Success' });
    this.router.navigate(['/login']);   // ← ПЕРЕХОД после logout
  });
}
}