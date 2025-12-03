import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { NgForOf, NgIf, AsyncPipe } from '@angular/common';

import { loadItems } from '../../items/state/items.actions';
import { selectItems, selectListLoading } from '../../items/state/items.selectors';

@Component({
  selector: 'app-items-list',
  standalone: true,
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css'],
  imports: [
    RouterLink,  
    NgForOf,
    NgIf,
    AsyncPipe
  ]
})
export class ItemsList implements OnInit {

  items$ = this.store.select(selectItems);
  loading$ = this.store.select(selectListLoading);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadItems({ query: '' }));
  }
}
