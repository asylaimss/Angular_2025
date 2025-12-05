import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';

import { ItemsService } from '../../services/items';
import { Item } from '../../services/item.model';
import { addFavorite } from '../../items/state/favorites.actions';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-item-details',
  standalone: true,
  templateUrl: './item-details.html',
  styleUrls: ['./item-details.css'],
  imports: [AsyncPipe, NgIf]
})
export class ItemDetailsComponent {

  item$!: Observable<Item>;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private store: Store
  ) {
    this.item$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => this.itemsService.getItem(id))
    );
  }

  addToFavorites(item: Item) {
    this.store.dispatch(addFavorite({ item }));
  }
}