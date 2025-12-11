import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';

import { Item } from '../../services/item.model';
import { addFavorite, removeFavorite } from '../../items/state/favorites.actions';
import { selectFavorites } from '../../items/state/favorites.selectors';
import { selectItems } from '../../items/state/items.selectors';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-details',
  standalone: true,
  templateUrl: './item-details.html',
  styleUrls: ['./item-details.css'],
  imports: [CommonModule, RouterModule, AsyncPipe],
})
export class ItemDetailsComponent {
  item$: Observable<Item | undefined>;
  favorites$ = this.store.select(selectFavorites);

  /** ТЕКУЩИЙ ТОВАР ДЛЯ TS */
  item: Item | null = null;

  /** ФЛАГ — в избранных ли текущий товар */
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.item$ = this.store.select(selectItems).pipe(
      map(items => items.find(i => i.id === id))
    );

    // Подписка чтобы сохранить item локально
    this.item$.subscribe(it => {
      this.item = it ?? null;
    });

    // Подписка чтобы отслеживать избранное
    this.favorites$.subscribe(favs => {
      this.isFavorite = favs.some(f => f.id === id);
    });
  }

  toggleFavorite() {
    if (!this.item) return;

    if (this.isFavorite) {
      this.store.dispatch(removeFavorite({ id: this.item.id }));
    } else {
      this.store.dispatch(addFavorite({ item: this.item }));
    }
  }
}