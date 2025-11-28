import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgIf, AsyncPipe } from '@angular/common';

import { loadItem } from '../../items/state/items.actions';
import { selectItem, selectItemLoading } from '../../items/state/items.selectors';

@Component({
  selector: 'app-item-details',
  standalone: true,
  templateUrl: './item-details.html',
  styleUrls: ['./item-details.css'],
  imports: [NgIf, AsyncPipe]
})
export class ItemDetails implements OnInit {

  item$ = this.store.select(selectItem);
  loading$ = this.store.select(selectItemLoading);

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.store.dispatch(loadItem({ id }));
    }
  }
}
