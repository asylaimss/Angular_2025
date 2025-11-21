import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private readonly baseUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  // /items?q=value
  getItems(query?: string): Observable<any[]> {
    const url =
      query && query.trim().length
        ? `${this.baseUrl}/search?q=${encodeURIComponent(query)}`
        : this.baseUrl;

    return this.http.get<any>(url).pipe(map((r) => r.products ?? []));
  }

  // /items/:id
  getItemById(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
