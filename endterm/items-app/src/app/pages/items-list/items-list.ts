import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { selectItems } from '../../items/state/items.selectors';
import { loadItems } from '../../items/state/items.actions';

@Component({
  selector: 'app-items-list',
  standalone: true,
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css'],
  imports: [NgFor, NgIf, FormsModule, RouterLink],
})
export class ItemsList implements OnInit {
  items: any[] = [];
  filtered: any[] = [];
  paginated: any[] = [];

  search = '';
  selectedBrand = '';
  sort = '';

  brands: string[] = [];

  page = 1;
  pageSize = 6;
  totalPages = 1;

  constructor(private store: Store) {}

  ngOnInit() {
    this.load(); // первая загрузка без фильтра

    this.store.select(selectItems).subscribe((items) => {
      this.items = items;
      this.brands = [...new Set(items.map((i) => i.brand))];
      this.applyFilters();
    });
  }

  // загрузка с бэка (поиск по q)
  load() {
    this.store.dispatch(loadItems({ query: this.search }));
  }

  // применяем фильтры на клиенте
  applyFilters() {
    let r = [...this.items];

    if (this.selectedBrand) {
      r = r.filter((i) => i.brand === this.selectedBrand);
    }

    if (this.sort === 'price_asc') r = r.sort((a, b) => a.price - b.price);
    if (this.sort === 'price_desc') r = r.sort((a, b) => b.price - a.price);
    if (this.sort === 'rating_desc') r = r.sort((a, b) => b.rating - a.rating);

    this.filtered = r;
    this.page = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filtered.length / this.pageSize) || 1;
    this.paginated = this.filtered.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.updatePagination();
    }
  }
}