import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

import { selectFavorites } from '../../items/state/favorites.selectors';
import { removeFavorite } from '../../items/state/favorites.actions';
import { Item } from '../../services/item.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.css'],
  imports: [AsyncPipe, NgFor, NgIf, RouterLink]
})
export class FavoritesComponent {

  favorites$: Observable<Item[]> = this.store.select(selectFavorites);

  constructor(private store: Store) {}

  remove(id: number) {
    this.store.dispatch(removeFavorite({ id }));
  }
}