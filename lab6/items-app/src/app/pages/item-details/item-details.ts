import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../../services/items';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-details.html',
  styleUrl: './item-details.css',
})
export class ItemDetails {
  item: any | null = null;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemsService: ItemsService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id === null || Number.isNaN(id)) {
      this.error = true;
      this.loading = false;
      return;
    }

    this.itemsService.getItemById(id).subscribe({
      next: (data) => {
        this.item = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  goBack() {
    this.router.navigateByUrl('/items');
  }
}
