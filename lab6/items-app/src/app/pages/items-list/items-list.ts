import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../../services/items';
import { ItemCard } from '../../components/item-card/item-card';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ItemCard],
  templateUrl: './items-list.html',
  styleUrl: './items-list.css',
})
export class ItemsList {
  query = '';
  items: any[] = [];
  loading = false;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemsService: ItemsService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.query = params.get('q') ?? '';
      this.fetchItems();
    });
  }

  fetchItems() {
    this.loading = true;
    this.error = false;

    this.itemsService.getItems(this.query).subscribe({
      next: (items) => {
        this.items = items;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  onSearch() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: this.query || null },
      queryParamsHandling: 'merge',
    });
  }
}
