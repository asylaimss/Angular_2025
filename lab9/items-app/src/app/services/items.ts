import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Item } from './item.model';   // ← ДОБАВИЛИ ЭТО

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private readonly baseUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getItems(query?: string): Observable<Item[]> {
    const url =
      query && query.trim().length
        ? `${this.baseUrl}/search?q=${encodeURIComponent(query)}`
        : this.baseUrl;

    return this.http.get<any>(url).pipe(map(r => r.products ?? []));
  }

  getItemById(id: number | string): Observable<Item> {
    return this.http.get<Item>(`${this.baseUrl}/${id}`);
  }
}
