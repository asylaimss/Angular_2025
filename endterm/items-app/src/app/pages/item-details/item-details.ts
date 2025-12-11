import { Component } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';

import { Item } from '../../services/item.model';
import { selectItems } from '../../items/state/items.selectors';
import { addFavorite, removeFavorite } from '../../items/state/favorites.actions';
import { selectFavorites } from '../../items/state/favorites.selectors';

@Component({
  selector: 'app-item-details',
  standalone: true,
  templateUrl: './item-details.html',
  styleUrls: ['./item-details.css'],
  imports: [NgIf, AsyncPipe, RouterLink],
})
export class ItemDetailsComponent {

  item$!: Observable<Item | undefined>;
  favoriteIds: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {
    // Загружаем текущий item
    this.item$ = combineLatest([
      this.store.select(selectItems),
      this.route.paramMap,
    ]).pipe(
      map(([items, params]) => {
        const id = Number(params.get('id'));
        return items.find(i => i.id === id);
      })
    );

    // Следим за избранными
    this.store.select(selectFavorites).subscribe(favs => {
      this.favoriteIds = favs.map(f => f.id);
    });
  }

  isFavorite(id: number | null | undefined): boolean {
    if (id === null || id === undefined) return false;
    return this.favoriteIds.includes(id);
  }

  toggleFavorite(item: Item) {
    if (!item.id) return;

    if (this.isFavorite(item.id)) {
      this.store.dispatch(removeFavorite({ id: item.id }));
    } else {
      this.store.dispatch(addFavorite({ item }));
    }
  }
}