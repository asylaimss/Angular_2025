import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { selectItems } from '../../items/state/items.selectors';
import { loadItems } from '../../items/state/items.actions';

import { addFavorite, removeFavorite } from '../../items/state/favorites.actions';
import { selectFavorites } from '../../items/state/favorites.selectors';
import { Item } from '../../services/item.model';

@Component({
  selector: 'app-items-list',
  standalone: true,
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css'],
  imports: [NgFor, NgIf, FormsModule, RouterLink],
})
export class ItemsListComponent implements OnInit {

  items: Item[] = [];
  favoriteIds: number[] = [];

  search = '';
  selectedBrand = '';
  sort = '';

  brands: string[] = [];

  constructor(private store: Store) {}

  ngOnInit() {
    // Загружаем товары
    this.store.dispatch(loadItems({ query: '' }));

    // Следим за товарами
    this.store.select(selectItems).subscribe((items) => {
      this.items = items;
      this.brands = [...new Set(items.map((i) => i.brand))];
    });

    // Следим за избранными
    this.store.select(selectFavorites).subscribe(favs => {
      this.favoriteIds = favs.map(f => f.id);
    });
  }

  isFavorite(id: number | undefined): boolean {
    return id !== undefined && this.favoriteIds.includes(id);
  }

  toggleFavorite(item: Item) {
    if (this.isFavorite(item.id)) {
      this.store.dispatch(removeFavorite({ id: item.id }));
    } else {
      this.store.dispatch(addFavorite({ item }));
    }
  }
}