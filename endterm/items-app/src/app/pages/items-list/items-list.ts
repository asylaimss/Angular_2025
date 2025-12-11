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
export class ItemsListComponent implements OnInit {
  items: any[] = [];
  filtered: any[] = [];
  paginated: any[] = [];

  search = '';
  selectedBrand = '';
  sort = '';

  brands: string[] = [];

  page = 1;
  pageSize = 8;
  totalPages = 1;

  constructor(private store: Store) {}

  ngOnInit() {
    // Загружаем товары один раз
    this.store.dispatch(loadItems({ query: '' }));

    this.store.select(selectItems).subscribe((items) => {
      this.items = items;
      this.brands = [...new Set(items.map((i) => i.brand).filter(Boolean))];
      this.applyFilters();
    });
  }

  // 🔍 Поиск — локальная фильтрация
  onSearchChange() {
    this.applyFilters();
  }

  // 🎯 Главная логика фильтрации
  applyFilters() {
    let r = [...this.items];

    const q = this.search.trim().toLowerCase();

    // Поиск (без ошибок)
    if (q) {
      r = r.filter(i => {
        const title = (i?.title ?? '').toLowerCase();
        const brand = (i?.brand ?? '').toLowerCase();
        return title.includes(q) || brand.includes(q);
      });
    }

    // Фильтр по бренду
    if (this.selectedBrand) {
      r = r.filter(i => i?.brand === this.selectedBrand);
    }

    // Сортировка
    const getPrice = (x: any) => Number(x?.price ?? 0);
    const getRating = (x: any) => Number(x?.rating ?? 0);

    switch (this.sort) {
      case 'price_asc':
        r.sort((a, b) => getPrice(a) - getPrice(b));
        break;

      case 'price_desc':
        r.sort((a, b) => getPrice(b) - getPrice(a));
        break;

      case 'rating_desc':
        r.sort((a, b) => getRating(b) - getRating(a));
        break;
    }

    this.filtered = r;
    this.page = 1;
    this.updatePagination();
  }

  // 📄 Пагинация
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