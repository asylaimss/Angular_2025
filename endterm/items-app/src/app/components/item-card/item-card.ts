import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { Item } from '../../services/item.model';

@Component({
  selector: 'app-item-card',
  standalone: true,
  templateUrl: './item-card.html',
  styleUrls: ['./item-card.css'],
  imports: [RouterLink, SlicePipe]
})
export class ItemCard {
  @Input() item!: Item;
}