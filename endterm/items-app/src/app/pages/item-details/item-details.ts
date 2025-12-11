import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf, AsyncPipe, NgFor } from '@angular/common';
import { Store } from '@ngrx/store';

import { selectItems } from '../../items/state/items.selectors';
import { selectFavorites } from '../../items/state/favorites.selectors';
import { addFavorite, removeFavorite } from '../../items/state/favorites.actions';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-item-details',
  standalone: true,
  templateUrl: './item-details.html',
  styleUrls: ['./item-details.css'],
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    RouterLink      // ← обязательно, если есть routerLink
  ]
})
export class ItemDetailsComponent implements OnInit {

  id!: number;

  item$ = this.store.select(selectItems).pipe(
    map(items => items.find(i => i.id === this.id))
  );

  isFavorite$ = this.store.select(selectFavorites).pipe(
    map(favs => favs.some(f => f.id === this.id))
  );

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  toggleFavorite(item: any) {
    this.isFavorite$.subscribe(isFav => {
      if (isFav) {
        this.store.dispatch(removeFavorite({ id: item.id }));
      } else {
        this.store.dispatch(addFavorite({ item }));
      }
    });
  }
}